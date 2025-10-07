import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { MessagesModule } from '../messages/messages.module';
import { ChatsModule } from '../chats/chats.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MessagesModule, ChatsModule, AuthModule],
  providers: [WsGateway, WsService],
})
export class WsModule {}
