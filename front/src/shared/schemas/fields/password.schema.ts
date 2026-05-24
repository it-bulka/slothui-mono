import { z, ZodObject, type ZodRawShape } from 'zod';

export const passwordSchema = z
  .string()
  .min(6, 'At least 6 characters')
  .max(20, 'Password must be at most 20 characters')
  .regex(/^(?=.*[a-z])/, 'Password must contain a lowercase letter')
  .regex(/^(?=.*[A-Z])/, 'Password must contain an uppercase letter')
  .regex(/^(?=.*[^a-zA-Z0-9])/, 'Password must contain a special character (e.g. !, @, #)')
  .regex(/^(?!.*\s)/, 'Password must not contain spaces')

export const passwordMatch = <
  T extends ZodRawShape & { password: z.ZodTypeAny; confirmPassword: z.ZodTypeAny }
>(
  schema: ZodObject<T>
) =>
  schema.refine(
    data => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );