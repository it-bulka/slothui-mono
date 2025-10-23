import { Module } from '@nestjs/common';
import { StatsFriendsService } from './stats-friends.service';
import { StatsFriendsController } from './stats-friends.controller';
import { FollowersSnapshotEntity } from '../../followers-snapshot/entities/followers-snapshot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FollowersSnapshotEntity])],
  controllers: [StatsFriendsController],
  providers: [StatsFriendsService],
})
export class StatsFriendsModule {}
