import { z } from 'zod';
export const nicknameSchema = z
  .string()
  .trim()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username must be at most 20 characters long" })
  .regex(/^[a-zA-Z0-9._]+$/, {
    message: "Only letters, numbers, dots and underscores are allowed",
  })
  .refine((val) => !/^(\.|_)/.test(val), {
    message: "Username cannot start with a dot or underscore",
  })
  .refine((val) => !/(\.|_)$/.test(val), {
    message: "Username cannot end with a dot or underscore",
  })
  .refine((val) => !/\.\./.test(val), {
    message: "Username cannot contain consecutive dots",
  });