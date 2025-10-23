import { Injectable } from '@nestjs/common';
import { FollowersSnapshotService } from './followers-snapshot.service';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class FollowersSnapshotCron {
  constructor(private readonly snapshot: FollowersSnapshotService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailySnapshot() {
    await this.snapshot.createDailySnapshot();
  }
}
