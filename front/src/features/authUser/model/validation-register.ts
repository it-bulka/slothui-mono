import { z } from 'zod';
import { nicknameSchema } from './schemas';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username is too short'),
  nickname: nicknameSchema,
  avatar: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'File is required',
    })
    .refine(
      (files) => files && files[0]?.size < 2 * 1024 * 1024, // < 2MB
      { message: 'File size must be less than 2MB' }
    )
    .refine(
      (files) => files && ['image/jpeg', 'image/png'].includes(files[0]?.type),
      { message: 'Only .jpg and .png are allowed' }
    ),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters').max(10, 'Password is too long. It should not be more than 10 symbols'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export type RegisterFormData = z.infer<typeof registerSchema>;