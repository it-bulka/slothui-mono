import { UserResponse } from './dto/user-response.dto';
import { AuthJwtUser } from '../auth/types/jwt.types';

export class UserMapper {
  static toResponse(user: UserResponse & Record<string, any>): UserResponse {
    return {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      role: user.role,
      email: user.email,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
    };
  }

  static toJwtUser(user: AuthJwtUser & Record<string, any>): AuthJwtUser {
    return {
      id: user.id,
      role: user.role,
    };
  }
}
