import { z, ZodObject, type ZodRawShape } from 'zod';

export const passwordSchema = z.string().min(6, 'At least 6 characters').max(10, 'Password is too long. It should not be more than 10 symbols')

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