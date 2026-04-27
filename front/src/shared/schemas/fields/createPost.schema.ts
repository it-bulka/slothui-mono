import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB — matches Multer + Cloudinary free plan limit

const fileSchema = z
  .custom<File>(val => val instanceof File, 'Invalid file')
  .refine(f => f.size <= MAX_FILE_SIZE, 'File size must be less than 10MB');

const filesSchema = z.array(fileSchema).min(1).max(25, 'Max 25 files');

export const createPostSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text'),
    text: z.string().min(1, 'Post text cannot be empty'),
  }),
  z.object({
    type:  z.literal('files'),
    text:  z.string().optional(),
    files: filesSchema,
  }),
  z.object({
    type: z.literal('poll'),
    text: z.string().optional(),
    poll: z.object({
      question:  z.string().min(1, 'Poll question cannot be empty'),
      answers:   z.array(z.object({ value: z.string().min(1) })).min(2, 'Poll must have at least 2 options'),
      multiple:  z.boolean(),
      anonymous: z.boolean(),
    }),
  }),
]);
