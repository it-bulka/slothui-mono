import { User } from '../entities/user.entity';

export type UserResponse = Partial<
  Omit<User, 'password' | 'hashPassword' | 'hashedRefreshToken'>
>;
