import { z } from 'zod';

export const draftEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be at most 255 characters'),
  description: z.string().min(1, 'Description is required').max(5000, 'Description must be at most 5000 characters'),
  isOnline: z.boolean(),
  date: z.date(),
  locationName: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
