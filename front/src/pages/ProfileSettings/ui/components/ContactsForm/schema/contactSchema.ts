import { z } from 'zod';

export const contactValueSchema = z
  .string()
  .min(1, 'Value is required')
  .max(255, 'Value is too long');

export const contactFormSchema = z.object({
  value: contactValueSchema,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
