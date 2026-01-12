import type { UserWithStats } from '@/shared/types';

export interface IAuthResponse {
  user: UserWithStats;
  token: string;
}