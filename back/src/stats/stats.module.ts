import { Module } from '@nestjs/common';
import { StatsFriendsModule } from './friends/stats-friends.module';
import { StatsFollowersModule } from './followers/stats-followers.module';

@Module({
  controllers: [],
  providers: [],
  imports: [StatsFriendsModule, StatsFollowersModule],
  exports: [StatsFollowersModule],
})
export class StatsModule {}
