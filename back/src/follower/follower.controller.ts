import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { AuthRequest } from '../common/types/user.types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('followers')
@UseGuards(JwtAuthGuard)
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post()
  async follow(@Body() userId: string, @Request() req: AuthRequest) {
    await this.followerService.followUser(req.user.id, userId);
  }

  @Delete()
  async unfollow(@Body() userId: string, @Request() req: AuthRequest) {
    await this.followerService.deleteFollower(userId, req.user.id);
  }

  @Post('/confirmation')
  async confirmFollowerReq(
    @Body() userId: string,
    @Request() req: AuthRequest,
  ) {
    await this.followerService.confirmFollower(req.user.id, userId);
  }

  @Delete('/confirmation')
  async rejectFollowerReq(@Body() userId: string, @Request() req: AuthRequest) {
    await this.followerService.deleteFollower(req.user.id, userId);
  }

  @Post()
  async getFollowers(
    @Param('id') id: string,
    @Query()
    q: {
      limit: number;
      cursor?: string | null;
      confirmation?: boolean | 'all';
    },
  ) {
    return await this.followerService.getFollowers({
      userId: id,
      limit: q.limit,
      cursor: q.cursor,
      confirmed: q.confirmation || true,
    });
  }
}
