import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ChatsModule } from '../chats/chats.module';
import { UserModule } from '../user/user.module';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from '../stories/entities/story.entity';
import { User } from '../user/entities/user.entity';
import { Chat } from '../chats/entities/chat.entity';
import { AttachmentsModule } from '../attachments/attachments.module';
import { Attachment } from '../attachments/entities/attachment.entity';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';
import { StoriesModule } from '../stories/stories.module';
import { EventsModule } from '../events/events.module';
import { PollsModule } from '../polls/polls.module';
import { OpenedChatsTracker } from './opened-chats-tracker.service';
import { UnreadBufferService } from './unread-buffer.service';

@Module({
  imports: [
    ChatsModule,
    UserModule,
    TypeOrmModule.forFeature([Message, Story, User, Chat, Attachment]),
    AttachmentsModule,
    EventEmitterModule,
    forwardRef(() => StoriesModule),
    EventsModule,
    PollsModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, OpenedChatsTracker, UnreadBufferService],
  exports: [MessagesService, OpenedChatsTracker, UnreadBufferService],
})
export class MessagesModule {}
