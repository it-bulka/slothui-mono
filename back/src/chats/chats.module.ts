import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { ChatMember } from './entities/chatMember.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, ChatMember]), UserModule],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
