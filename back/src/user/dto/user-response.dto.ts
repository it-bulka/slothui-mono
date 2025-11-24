import { User } from '../entities/user.entity';

export type UserResponse = Partial<
  Pick<User, 'id' | 'name' | 'nickname' | 'role' | 'avatarUrl' | 'email'>
>;
