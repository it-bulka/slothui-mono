import { z } from 'zod';
import { usernameSchema, nicknameSchema, avatarSchema } from '@/shared/schemas';

export const profileSchema = z.object({
  username: usernameSchema,
  nickname: nicknameSchema,
  avatarFile: avatarSchema, // userUpload
  avatarUrl: z.string().optional(),  // for preview -> from backend
  bio: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;