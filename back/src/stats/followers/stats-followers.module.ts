import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from '../../follower/entity/follower.entity';
import { StatsFollowersService } from './stats-followers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  providers: [StatsFollowersService],
  exports: [StatsFollowersService],
})
export class StatsFollowersModule {}
