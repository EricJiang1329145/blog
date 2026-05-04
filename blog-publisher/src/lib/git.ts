import { invoke } from '@tauri-apps/api/core';

const REPO_URL = 'https://github.com/EricJiang1329145/blog';

export async function cloneRepo(token: string, destPath: string): Promise<void> {
  await invoke('git_clone', {
    token,
    repoUrl: REPO_URL,
    dest: destPath
  });
}

export async function writeFile(path: string, content: string): Promise<void> {
  await invoke('write_file', { path, content });
}

export async function commitAndPush(
  repoPath: string,
  filePath: string,
  content: string,
  message: string
): Promise<void> {
  await writeFile(filePath, content);
  await invoke('git_add_commit_push', { repoPath, filePath, message });
}