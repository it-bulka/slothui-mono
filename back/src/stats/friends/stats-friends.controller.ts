import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StatsFriendsService } from './stats-friends.service';
import { AuthRequest } from '../../common/types/user.types';
import { JwtAuthGuard } from '../../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../../docs/swagger/api-auth.decorator';
import { ApiGetFriendsStats } from '../decorators/api-stats.decorator';

@ApiTags('Stats')
@ApiAuth()
@Controller('stats/friends')
@UseGuards(JwtAuthGuard)
export class StatsFriendsController {
  constructor(private readonly friendsService: StatsFriendsService) {}

  @Get()
  @ApiGetFriendsStats()
  async getFriendsStats(@Req() req: AuthRequest) {
    return await this.friendsService.getStats(req.user.id);
  }
}
