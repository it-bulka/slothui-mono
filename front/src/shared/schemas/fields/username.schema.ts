import { z } from 'zod';

export const usernameSchema = z.string().min(3, 'Username is too short')