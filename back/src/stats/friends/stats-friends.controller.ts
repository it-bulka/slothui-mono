import { Controller, Get, Req } from '@nestjs/common';
import { StatsFriendsService } from './stats-friends.service';
import { AuthRequest } from '../../common/types/user.types';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('stats/friends')
@UseGuards(AuthGuard)
export class StatsFriendsController {
  constructor(private readonly friendsService: StatsFriendsService) {}

  @Get()
  async getFriendsStats(@Req() req: AuthRequest) {
    return await this.friendsService.getStats(req.user.id);
  }
}
