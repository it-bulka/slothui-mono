import { User } from '../entities/user.entity';

export type UserResponse = Pick<
  User,
  'id' | 'username' | 'nickname' | 'role' | 'avatarUrl' | 'email' | 'bio'
>;

export interface UserShortDTO {
  id: string;
  username: string;
  nickname: string;
  avatarUrl?: string;
}
