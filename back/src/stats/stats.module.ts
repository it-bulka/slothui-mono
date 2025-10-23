import { Module } from '@nestjs/common';
import { StatsFriendsModule } from './friends/stats-friends.module';

@Module({
  controllers: [],
  providers: [],
  imports: [StatsFriendsModule],
})
export class StatsModule {}
