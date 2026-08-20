// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64::{engine::general_purpose::STANDARD, Engine as _};
use serde::{Deserialize, Serialize};
use std::path::Path;
use std::process::Command;
use std::sync::Mutex;
use tauri::{AppHandle, Manager, State};

const REPO_URL: &str = "https://github.com/EricJiang1329145/blog";

#[derive(Default)]
struct AuthSession(Mutex<Option<String>>);

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DeviceAuthorization {
    device_code: String,
    user_code: String,
    verification_uri: String,
    expires_in: u64,
    interval: u64,
}

#[derive(Deserialize)]
struct DeviceAuthorizationResponse {
    device_code: String,
    user_code: String,
    verification_uri: String,
    expires_in: u64,
    interval: Option<u64>,
}

#[derive(Deserialize)]
struct DeviceTokenResponse {
    access_token: Option<String>,
    error: Option<String>,
    error_description: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DevicePollResult {
    status: String,
    message: Option<String>,
}

fn git_command_with_token(token: &str) -> Command {
    let credentials = STANDARD.encode(format!("x-access-token:{token}"));
    let mut command = Command::new("git");
    command
        .env("GIT_CONFIG_COUNT", "1")
        .env("GIT_CONFIG_KEY_0", "http.https://github.com/.extraHeader")
        .env(
            "GIT_CONFIG_VALUE_0",
            format!("Authorization: Basic {credentials}"),
        );
    command
}

fn session_token(session: &State<'_, AuthSession>) -> Result<String, String> {
    session
        .0
        .lock()
        .map_err(|_| "Authentication session is unavailable".to_string())?
        .clone()
        .ok_or_else(|| "Please sign in with GitHub first".to_string())
}

fn command_error(action: &str, output: &std::process::Output) -> String {
    let stderr = String::from_utf8_lossy(&output.stderr).trim().to_string();
    if stderr.is_empty() {
        format!("{action} failed with status {}", output.status)
    } else {
        format!("{action} failed: {stderr}")
    }
}

#[tauri::command]
async fn github_start_device_authorization(
    client_id: String,
) -> Result<DeviceAuthorization, String> {
    if client_id.trim().is_empty() {
        return Err("VITE_GITHUB_CLIENT_ID is not configured".to_string());
    }

    let response = reqwest::Client::new()
        .post("https://github.com/login/device/code")
        .header("Accept", "application/json")
        .form(&[
            ("client_id", client_id),
            ("scope", "public_repo".to_string()),
        ])
        .send()
        .await
        .map_err(|error| format!("Could not contact GitHub: {error}"))?;

    if !response.status().is_success() {
        return Err(format!(
            "GitHub device authorization failed with status {}",
            response.status()
        ));
    }

    let data: DeviceAuthorizationResponse = response
        .json()
        .await
        .map_err(|error| format!("Invalid GitHub response: {error}"))?;

    Ok(DeviceAuthorization {
        device_code: data.device_code,
        user_code: data.user_code,
        verification_uri: data.verification_uri,
        expires_in: data.expires_in,
        interval: data.interval.unwrap_or(5).max(1),
    })
}

#[tauri::command]
async fn github_poll_device_authorization(
    client_id: String,
    device_code: String,
    session: State<'_, AuthSession>,
) -> Result<DevicePollResult, String> {
    let response = reqwest::Client::new()
        .post("https://github.com/login/oauth/access_token")
        .header("Accept", "application/json")
        .form(&[
            ("client_id", client_id),
            ("device_code", device_code),
            (
                "grant_type",
                "urn:ietf:params:oauth:grant-type:device_code".to_string(),
            ),
        ])
        .send()
        .await
        .map_err(|error| format!("Could not contact GitHub: {error}"))?;

    let data: DeviceTokenResponse = response
        .json()
        .await
        .map_err(|error| format!("Invalid GitHub response: {error}"))?;

    if let Some(token) = data.access_token {
        *session
            .0
            .lock()
            .map_err(|_| "Authentication session is unavailable".to_string())? = Some(token);
        return Ok(DevicePollResult {
            status: "authorized".to_string(),
            message: None,
        });
    }

    Ok(DevicePollResult {
        status: data.error.unwrap_or_else(|| "unknown_error".to_string()),
        message: data.error_description,
    })
}

#[tauri::command]
fn github_logout(session: State<'_, AuthSession>) -> Result<(), String> {
    *session
        .0
        .lock()
        .map_err(|_| "Authentication session is unavailable".to_string())? = None;
    Ok(())
}

fn repository_path(app: &AppHandle) -> Result<std::path::PathBuf, String> {
    let app_data = app
        .path()
        .app_data_dir()
        .map_err(|error| format!("Could not resolve the application data directory: {error}"))?;
    std::fs::create_dir_all(&app_data)
        .map_err(|error| format!("Could not create the application data directory: {error}"))?;
    Ok(app_data.join("blog-repo"))
}

#[tauri::command]
fn git_sync(app: AppHandle, session: State<'_, AuthSession>) -> Result<String, String> {
    let token = session_token(&session)?;
    let destination = repository_path(&app)?;
    if !destination.exists() {
        let output = git_command_with_token(&token)
            .arg("clone")
            .arg(REPO_URL)
            .arg(&destination)
            .output()
            .map_err(|error| error.to_string())?;
        return if output.status.success() {
            Ok(destination.to_string_lossy().into_owned())
        } else {
            Err(command_error("git clone", &output))
        };
    }

    if !destination.join(".git").is_dir() {
        return Err("The repository destination exists but is not a Git repository".to_string());
    }

    // Remove credentials embedded by older app versions before any network operation.
    let remote_output = Command::new("git")
        .current_dir(&destination)
        .args(["remote", "set-url", "origin", REPO_URL])
        .output()
        .map_err(|error| error.to_string())?;
    if !remote_output.status.success() {
        return Err(command_error("git remote set-url", &remote_output));
    }

    // Older versions configured the plaintext credential store locally.
    let _ = Command::new("git")
        .current_dir(&destination)
        .args(["config", "--local", "--unset-all", "credential.helper"])
        .output();

    let pull_output = git_command_with_token(&token)
        .current_dir(&destination)
        .args(["pull", "--ff-only"])
        .output()
        .map_err(|error| error.to_string())?;
    if pull_output.status.success() {
        Ok(destination.to_string_lossy().into_owned())
    } else {
        Err(command_error("git pull", &pull_output))
    }
}

#[tauri::command]
fn git_add_commit_push(
    file_path: &str,
    message: &str,
    app: AppHandle,
    session: State<'_, AuthSession>,
) -> Result<(), String> {
    let token = session_token(&session)?;
    let repo = std::fs::canonicalize(repository_path(&app)?)
        .map_err(|error| format!("Invalid repository path: {error}"))?;
    let file = std::fs::canonicalize(file_path)
        .map_err(|error| format!("Invalid article path: {error}"))?;
    if !file.starts_with(&repo) {
        return Err("The article must be inside the configured repository".to_string());
    }
    let relative_file = file
        .strip_prefix(&repo)
        .map_err(|_| "Could not resolve article path".to_string())?;
    if !relative_file.starts_with(Path::new("content/posts"))
        || relative_file
            .extension()
            .and_then(|extension| extension.to_str())
            != Some("md")
    {
        return Err("Only Markdown articles inside content/posts can be published".to_string());
    }

    let add_output = Command::new("git")
        .current_dir(&repo)
        .arg("add")
        .arg(relative_file)
        .output()
        .map_err(|error| error.to_string())?;
    if !add_output.status.success() {
        return Err(command_error("git add", &add_output));
    }

    let commit_output = Command::new("git")
        .current_dir(&repo)
        .args(["commit", "-m", message])
        .output()
        .map_err(|error| error.to_string())?;
    if !commit_output.status.success() {
        return Err(command_error("git commit", &commit_output));
    }

    let push_output = git_command_with_token(&token)
        .current_dir(&repo)
        .args(["push"])
        .output()
        .map_err(|error| error.to_string())?;
    if !push_output.status.success() {
        return Err(command_error("git push", &push_output));
    }

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .manage(AuthSession::default())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            github_start_device_authorization,
            github_poll_device_authorization,
            github_logout,
            git_sync,
            git_add_commit_push
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
