import { z } from 'zod';
import { avatarSchema, nicknameSchema, usernameSchema, passwordSchema, passwordMatch } from '@/shared/schemas';

const registerSchemaBase = z.object({
  username: usernameSchema,
  nickname: nicknameSchema,
  avatar: avatarSchema,
  email: z.string().email('Invalid email'),
  password: passwordSchema,
  confirmPassword: z.string()
})

export const registerSchema =  passwordMatch(registerSchemaBase)


export type RegisterFormData = z.infer<typeof registerSchema>;