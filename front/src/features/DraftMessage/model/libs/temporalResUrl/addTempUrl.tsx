import type { FileWithTempUrl } from '@/shared/types';

export const addTempUrl = (file: File): FileWithTempUrl => {
  return Object.assign(file, {
    tempUrl: URL.createObjectURL(file)
  });
}