import { z } from 'zod';

export const avatarSchema = z
  .custom<FileList>((val) => val instanceof FileList, { message: 'Invalid file' })
  .optional()
  .refine(
    (files) => !files || files[0]?.size < 2 * 1024 * 1024,
    { message: 'File size must be less than 2MB' }
  )
  .refine(
    (files) => !files || ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files[0]?.type),
    { message: 'Only .jpg and .png are allowed' }
  );