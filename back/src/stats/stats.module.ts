import { Module } from '@nestjs/common';
import { StatsFriendsModule } from './friends/stats-friends.module';
import { StatsFollowersModule } from './followers/stats-followers.module';
import { StatsCountersModule } from './counters/stats-counters.module';

@Module({
  controllers: [],
  providers: [],
  imports: [StatsFriendsModule, StatsFollowersModule, StatsCountersModule],
  exports: [StatsFollowersModule],
})
export class StatsModule {}
