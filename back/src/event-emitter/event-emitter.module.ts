import { Module } from '@nestjs/common';
import { EventEmitterMessageService } from './event-emitter-message.service';
import { EventEmitterNotificationService } from './event-emitter-notification.service';
import { EventEmitterFollowersService } from './event-emitter-followers.service';
import { EventEmitterChatService } from './event-emitter-chat.service';
import { EventEmitterContactsService } from './event-emitter-contacts.service';

@Module({
  providers: [
    EventEmitterMessageService,
    EventEmitterNotificationService,
    EventEmitterFollowersService,
    EventEmitterChatService,
    EventEmitterContactsService,
  ],
  exports: [
    EventEmitterMessageService,
    EventEmitterNotificationService,
    EventEmitterFollowersService,
    EventEmitterChatService,
    EventEmitterContactsService,
  ],
})
export class EventEmitterModule {}
