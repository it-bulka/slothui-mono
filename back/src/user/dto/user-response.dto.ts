import { User } from '../entities/user.entity';

export type UserResponse = Pick<
  User,
  'id' | 'name' | 'nickname' | 'role' | 'avatarUrl' | 'email'
>;
