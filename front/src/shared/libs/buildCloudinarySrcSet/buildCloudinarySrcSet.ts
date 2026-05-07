const CLOUDINARY_UPLOAD_SEGMENT = '/upload/';

export function buildCloudinarySrcSet(url: string, widths: number[]): string | undefined {
  if (!url.includes(CLOUDINARY_UPLOAD_SEGMENT)) return undefined;
  return widths
    .map(w => `${url.replace(CLOUDINARY_UPLOAD_SEGMENT, `/upload/w_${w},f_auto,q_auto/`)} ${w}w`)
    .join(', ');
}
