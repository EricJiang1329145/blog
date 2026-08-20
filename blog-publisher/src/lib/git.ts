import { invoke } from '@tauri-apps/api/core';
import { writeTextFile } from '@tauri-apps/plugin-fs';

export async function syncRepo(): Promise<string> {
  return invoke<string>('git_sync');
}

export async function commitAndPush(
  filePath: string,
  content: string,
  message: string
): Promise<void> {
  await writeTextFile(filePath, content);
  await invoke('git_add_commit_push', { filePath, message });
}
