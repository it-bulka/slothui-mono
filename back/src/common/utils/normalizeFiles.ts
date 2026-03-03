import { fixFileNameCoding } from './fixFileNameCoding';
export function normalizeFiles<T extends Record<string, Express.Multer.File[]>>(
  raw: T | undefined,
) {
  if (!raw) return undefined;

  const hasFiles = Object.values(raw).some(
    (arr) => Array.isArray(arr) && arr.length > 0,
  );

  if (!hasFiles) return undefined;

  // encoding fixing
  const fixed: T = {} as T;
  for (const key in raw) {
    const arr = raw[key];
    if (Array.isArray(arr)) {
      fixed[key] = arr.map((file) => ({
        ...file,
        originalname: fixFileNameCoding(file.originalname),
      })) as typeof arr;
    }
  }

  return fixed;
}
