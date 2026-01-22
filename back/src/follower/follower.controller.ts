import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  UseGuards,
  Query,
  Get,
  Param,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { AuthRequest } from '../common/types/user.types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventEmitterNotificationService } from '../event-emitter/event-emitter-notification.service';
import { FriendDto } from './dto/follower.dto';
import { Follower } from './entity/follower.entity';
import { FollowUserDto } from './dto/follow-user.dto';

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FollowerController {
  constructor(
    private readonly followerService: FollowerService,
    private readonly notificationEmitter: EventEmitterNotificationService,
  ) {}

  @Post()
  async follow(@Body() dto: FollowUserDto, @Request() req: AuthRequest) {
    const following = await this.followerService.followUser(
      req.user.id,
      dto.userId,
    );

    return following;
  }

  @Delete('followers')
  async deleteFollowers(
    @Param('userId') userId: string,
    @Request() req: AuthRequest,
  ) {
    await this.followerService.deleteFollower(userId, req.user.id);
    return { id: userId };
  }

  @Delete('followee/:userId')
  async unfollow(@Param('userId') userId: string, @Request() req: AuthRequest) {
    await this.followerService.deleteFollower(req.user.id, userId);
    return { id: userId };
  }

  @Post('/confirmation')
  async confirmFollowerReq(
    @Body() userId: string,
    @Request() req: AuthRequest,
  ) {
    const following = await this.followerService.confirmFollower(
      req.user.id,
      userId,
    );

    this.notificationEmitter.onFriendConfirmed(
      following.follower.id,
      following.followee,
    );
  }

  @Delete('/confirmation')
  async rejectFollowerReq(@Body() userId: string, @Request() req: AuthRequest) {
    await this.followerService.deleteFollower(req.user.id, userId);
  }

  @Get('followers')
  async getFollowers(
    @Query('userId') userId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = 15,
  ) {
    const result = await this.followerService.getFollowers({
      userId,
      limit,
      cursor,
    });

    const items = result.items.map((f) => this.mapToFriendDto(f, userId));
    return { ...result, items };
  }

  @Get('followings')
  async getFollowings(
    @Query('userId') userId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = 15,
  ) {
    const result = await this.followerService.getFollowings({
      userId,
      limit,
      cursor,
    });

    const items = result.items.map((f) => this.mapToFriendDto(f, userId));
    return { ...result, items };
  }

  @Get('suggestions')
  async getSuggestions(
    @Query('userId') userId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = 15,
  ) {
    return await this.followerService.getSuggestions({
      currentUserId: userId,
      cursor,
      limit,
    });
  }

  private mapToFriendDto(f: Follower, currentUserId: string): FriendDto {
    const isFollower = f.follower.id === currentUserId;
    const isFollowing = f.followee.id === currentUserId;

    const user = isFollower ? f.followee : f.follower;

    return {
      id: user.id,
      src: user.avatarUrl || '',
      name: user.name,
      nickname: user.nickname,
      isFollower,
      isFollowing,
    };
  }
}
