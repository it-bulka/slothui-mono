import { z } from 'zod';
import { passwordSchema, passwordMatch } from '@/shared/schemas';

const changePasswordSchemaBase = z.object({
  oldPassword: passwordSchema,
  password: passwordSchema,
  confirmPassword: z.string()
})

export const changePasswordSchema =  passwordMatch(changePasswordSchemaBase)


export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;