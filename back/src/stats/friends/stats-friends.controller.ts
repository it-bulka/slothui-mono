import { Controller, Get, Req } from '@nestjs/common';
import { StatsFriendsService } from './stats-friends.service';
import { AuthRequest } from '../../common/types/user.types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards';

@Controller('stats/friends')
@UseGuards(JwtAuthGuard)
export class StatsFriendsController {
  constructor(private readonly friendsService: StatsFriendsService) {}

  @Get()
  async getFriendsStats(@Req() req: AuthRequest) {
    return await this.friendsService.getStats(req.user.id);
  }
}
