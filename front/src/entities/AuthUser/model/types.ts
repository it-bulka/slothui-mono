import type { UserWithStats } from '@/shared/types';

export interface AuthUserState {
  data: UserWithStats | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}