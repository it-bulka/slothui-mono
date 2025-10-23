import { Module } from '@nestjs/common';
import { FollowersSnapshotService } from './followers-snapshot.service';

@Module({
  controllers: [],
  providers: [FollowersSnapshotService],
})
export class FollowersSnapshotModule {}
