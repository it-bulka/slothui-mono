import type { UserWithStats } from '@/shared/types';

export interface AuthUserState {
  data: UserWithStats | null;
  isToken: boolean;
  isLoading: boolean;
  error: string | null;
}