import type { UserWithStats } from '@/shared/types/user.types.ts';

export interface IAuthResponse {
  user: UserWithStats;
  token: string;
}

export interface RegisterUserArgs {
  email: string;
  password: string;
  name: string;
  nickname: string;
  avatar?: FileList;
}