import { Module } from '@nestjs/common';
import { FollowersSnapshotService } from './followers-snapshot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersSnapshotEntity } from './entities/followers-snapshot.entity';
import { User } from '../user/entities/user.entity';
import { FollowersSnapshotCron } from './followers-snapshot-cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([FollowersSnapshotEntity, User])],
  controllers: [],
  providers: [FollowersSnapshotService, FollowersSnapshotCron],
})
export class FollowersSnapshotModule {}
