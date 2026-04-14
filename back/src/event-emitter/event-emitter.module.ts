import { Module } from '@nestjs/common';
import { EventEmitterMessageService } from './event-emitter-message.service';
import { EventEmitterNotificationService } from './event-emitter-notification.service';
import { EventEmitterFollowersService } from './event-emitter-followers.service';
import { EventEmitterChatService } from './event-emitter-chat.service';

@Module({
  providers: [
    EventEmitterMessageService,
    EventEmitterNotificationService,
    EventEmitterFollowersService,
    EventEmitterChatService,
  ],
  exports: [
    EventEmitterMessageService,
    EventEmitterNotificationService,
    EventEmitterFollowersService,
    EventEmitterChatService,
  ],
})
export class EventEmitterModule {}
