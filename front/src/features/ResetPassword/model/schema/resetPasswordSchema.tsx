import { z } from 'zod';
import { passwordSchema, passwordMatch } from '@/shared/schemas';

const resetPasswordSchemaBase = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema
})

export const resetPasswordSchema =  passwordMatch(resetPasswordSchemaBase)


export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;