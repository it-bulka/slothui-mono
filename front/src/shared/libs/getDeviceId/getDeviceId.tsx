import { nanoid } from 'nanoid';

export const getDeviceId = (): string => {
  const existing = localStorage.getItem('deviceId');
  if (existing) return existing;
  const id = nanoid();
  localStorage.setItem('deviceId', id);
  return id;
}
