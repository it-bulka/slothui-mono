import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StoriesService } from './stories.service';

@Injectable()
export class StoriesCleanupService {
  constructor(private readonly storiesService: StoriesService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleExpiredStories() {
    await this.storiesService.deleteExpiredStories();
  }
}
