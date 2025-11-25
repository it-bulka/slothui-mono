import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { MessagesModule } from '../messages/messages.module';
import { ChatsModule } from '../chats/chats.module';
import { AuthModule } from '../auth/auth.module';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  imports: [EventEmitterModule, MessagesModule, ChatsModule, AuthModule],
  providers: [WsGateway, WsService],
})
export class WsModule {}
