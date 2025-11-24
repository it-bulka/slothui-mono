import { Injectable } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AttachmentsCronService {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async retryFailedDeletes() {
    await this.attachmentsService.findFailedToDelete();
  }
}
