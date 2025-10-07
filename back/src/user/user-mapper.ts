import { User } from './entities/user.entity';
import { UserResponse } from './dto/user-response.dto';

export class UserMapper {
  static toResponse(user: Partial<User>): UserResponse {
    const {
      password: _pass,
      hashPassword: _hashPass,
      hashedRefreshToken: _token,
      ...restUser
    } = user;
    return restUser;
  }
}
