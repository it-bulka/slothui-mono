import { createHash } from 'crypto';
export function createFingerprint(deviceId: string, userAgent: string) {
  return createHash('sha256')
    .update(deviceId + userAgent)
    .digest('hex');
}
