import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ChatsModule } from '../chats/chats.module';
import { UserModule } from '../user/user.module';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ChatsModule, UserModule, TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
