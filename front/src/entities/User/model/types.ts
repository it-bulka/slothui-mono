import type { IUser } from '@/entities/User';

export interface UserState {
  data: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}