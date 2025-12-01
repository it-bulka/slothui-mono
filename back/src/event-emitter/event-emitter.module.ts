import { Module } from '@nestjs/common';
import { EventEmitterMessageService } from './event-emitter-message.service';
import { EventEmitterNotificationService } from './event-emitter-notification.service';

@Module({
  providers: [EventEmitterMessageService, EventEmitterNotificationService],
  exports: [EventEmitterMessageService, EventEmitterNotificationService],
})
export class EventEmitterModule {}
