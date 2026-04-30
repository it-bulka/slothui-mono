import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StatsCountersService } from './stats-counters.service';
import { AuthRequest } from '../../common/types/user.types';
import { JwtAuthGuard } from '../../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../../docs/swagger/api-auth.decorator';
import { ApiGetCounters } from '../decorators/api-stats.decorator';

@ApiTags('Stats')
@ApiAuth()
@Controller('stats/counters')
@UseGuards(JwtAuthGuard)
export class StatsCountersController {
  constructor(private readonly countersService: StatsCountersService) {}

  @Get()
  @ApiGetCounters()
  async getCounters(@Req() req: AuthRequest) {
    return await this.countersService.getCounters(req.user.id);
  }
}
