const CLOUDINARY_UPLOAD_SEGMENT = '/upload/'

export const getOptimizedImageUrl = (url: string | null | undefined, width: number): string => {
  if (!url || !url.includes(CLOUDINARY_UPLOAD_SEGMENT)) return url ?? ''
  return url.replace(
    CLOUDINARY_UPLOAD_SEGMENT,
    `${CLOUDINARY_UPLOAD_SEGMENT}w_${width},h_${width},c_fill,f_auto,q_auto/`
  )
}
