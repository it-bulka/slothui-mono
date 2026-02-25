import { Module } from '@nestjs/common';
import { EventEmitterMessageService } from './event-emitter-message.service';
import { EventEmitterNotificationService } from './event-emitter-notification.service';
import { EventEmitterFollowersService } from './event-emitter-followers.service';

@Module({
  providers: [
    EventEmitterMessageService,
    EventEmitterNotificationService,
    EventEmitterFollowersService,
  ],
  exports: [
    EventEmitterMessageService,
    EventEmitterNotificationService,
    EventEmitterFollowersService,
  ],
})
export class EventEmitterModule {}
