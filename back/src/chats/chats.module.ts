import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { ChatMember } from './entities/chatMember.entity';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, User, ChatMember]),
    UserModule,
    EventEmitterModule,
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
