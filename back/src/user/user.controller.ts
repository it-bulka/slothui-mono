import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../common/types/user.types';
import { UserMapper } from './user-mapper';
import { SearchUsersQueryDto } from './dto/search-user.query';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me/profile')
  async getProfile(@Request() req: AuthRequest) {
    const user = await this.userService.findOne(req.user.id);
    if (!user) return null;
    return UserMapper.toResponse(user);
  }

  @Get()
  async searchUsers(@Query() q: SearchUsersQueryDto) {
    return await this.userService.search({
      search: q.search,
      limit: q.limit,
      cursor: q.cursor,
    });
  }

  @Get(':userId/profile')
  async getUser(@Param('userId') userId: string, @Request() req: AuthRequest) {
    return await this.userService.getProfileDataForOtherUser(
      userId,
      req.user.id,
    );
  }
}
