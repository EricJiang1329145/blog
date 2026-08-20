import { invoke } from '@tauri-apps/api/core';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || '';

export interface DeviceAuthorization {
  deviceCode: string;
  userCode: string;
  verificationUri: string;
  expiresIn: number;
  interval: number;
}

export interface DevicePollResult {
  status: 'authorized' | 'authorization_pending' | 'slow_down' | 'expired_token' | 'access_denied' | string;
  message?: string;
}

export function startDeviceAuthorization(): Promise<DeviceAuthorization> {
  return invoke('github_start_device_authorization', {
    clientId: GITHUB_CLIENT_ID,
  });
}

export function pollDeviceAuthorization(deviceCode: string): Promise<DevicePollResult> {
  return invoke('github_poll_device_authorization', {
    clientId: GITHUB_CLIENT_ID,
    deviceCode,
  });
}

export function clearGitHubSession(): Promise<void> {
  return invoke('github_logout');
}
