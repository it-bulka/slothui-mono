import type { UserWithStats } from '@/shared/types/user.types.ts';

export type IAuthResponse = {
  profile: UserWithStats;
  token: string;
  linkedProviders: {provider: string, providerId: string}[];
}

export interface RegisterUserArgs {
  email: string;
  password: string;
  username: string;
  nickname: string;
  avatar?: FileList;
}