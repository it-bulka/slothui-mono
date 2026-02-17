import { z } from 'zod';
import { avatarSchema, nicknameSchema, usernameSchema } from '@/shared/schemas';

export const registerSchema = z.object({
  username: usernameSchema,
  nickname: nicknameSchema,
  avatar: avatarSchema,
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters').max(10, 'Password is too long. It should not be more than 10 symbols'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export type RegisterFormData = z.infer<typeof registerSchema>;