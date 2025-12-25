import { User } from '../entities/user.entity';

export type UserResponse = Pick<
  User,
  'id' | 'name' | 'nickname' | 'role' | 'avatarUrl' | 'email'
>;

export interface UserShortDTO {
  id: string;
  nickname: string;
  avatarUrl?: string;
}
