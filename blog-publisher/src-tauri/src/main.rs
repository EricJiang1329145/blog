// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

#[tauri::command]
fn git_clone(token: &str, repo_url: &str, dest: &str) -> Result<(), String> {
    let clean_url = repo_url.replace("https://", "");
    let auth_url = format!("https://x-access-token:{}@{}", token, clean_url);

    let _output = Command::new("git")
        .args(["clone", &auth_url, dest])
        .output()
        .map_err(|e| e.to_string())?;

    // Configure git to store credentials for subsequent push operations
    let _config_output = Command::new("git")
        .current_dir(dest)
        .args(["config", "credential.helper", "store"])
        .output()
        .map_err(|e| e.to_string())?;

    // Write credentials to git store for subsequent operations
    let creds_url = format!("https://x-access-token:{}@{}", token, clean_url);
    let _cred_write = Command::new("git")
        .current_dir(dest)
        .args(["credential", "store"])
        .stdin(std::process::Stdio::piped())
        .output()
        .map_err(|e| e.to_string())?;

    // Use git config to store token in remote URL instead
    let _remote_set_output = Command::new("git")
        .current_dir(dest)
        .args(["remote", "set-url", "origin", &creds_url])
        .output()
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn git_add_commit_push(repo_path: &str, file_path: &str, message: &str) -> Result<(), String> {
    // Git add
    let _add_output = Command::new("git")
        .current_dir(repo_path)
        .args(["add", file_path])
        .output()
        .map_err(|e| e.to_string())?;

    // Git commit
    let commit_output = Command::new("git")
        .current_dir(repo_path)
        .args(["commit", "-m", message])
        .output()
        .map_err(|e| e.to_string())?;

    if !commit_output.status.success() {
        return Err(String::from_utf8_lossy(&commit_output.stderr).to_string());
    }

    // Git push
    let push_output = Command::new("git")
        .current_dir(repo_path)
        .args(["push"])
        .output()
        .map_err(|e| e.to_string())?;

    if !push_output.status.success() {
        return Err(String::from_utf8_lossy(&push_output.stderr).to_string());
    }

    Ok(())
}

#[tauri::command]
fn write_file(path: &str, content: &str) -> Result<(), String> {
    std::fs::write(path, content).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![git_clone, git_add_commit_push, write_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}