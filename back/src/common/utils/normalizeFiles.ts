export function normalizeFiles<T extends Record<string, Express.Multer.File[]>>(
  raw: T | undefined,
) {
  if (!raw) return undefined;

  const hasFiles = Object.values(raw).some(
    (arr) => Array.isArray(arr) && arr.length > 0,
  );

  return hasFiles ? raw : undefined;
}
