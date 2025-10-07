import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../common/types/user.types';
import { UserMapper } from './user-mapper';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  async getProfile(@Request() req: AuthRequest) {
    const user = await this.userService.findOne(req.user.id);
    if (!user) return null;
    return UserMapper.toResponse(user);
  }
}
