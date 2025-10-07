import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { ChatRequestEvents, ChatServerEvents } from './types/chat.events';
import {
  MessageRequestEvents,
  MessageServerEvents,
} from './types/message.events';
import { Socket, Server } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { SocketWithUser } from './types/socketWithUser.type';
import { ChatsService } from '../chats/chats.service';
import { CreateChatDto } from '../chats/dto/createChat.dto';
import { UseFilters } from '@nestjs/common';
import { GatewayExceptionsFilter } from './filters/exceptions.filter';
import { ValidateDtoPipe } from './pipes/validateDto.pipe';

@ValidateDtoPipe()
@UseFilters(GatewayExceptionsFilter)
@WebSocketGateway({
  path: '/ws',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server: Server;
  constructor(
    private readonly wsService: WsService,
    private readonly messagesService: MessagesService,
    private readonly chatsService: ChatsService,
  ) {}

  afterInit(server: Server) {
    this.wsService.authMiddleware(server);
  }

  handleConnection(client: Socket) {
    console.log('handleConnection', client.id);
    console.log('rooms', this.server.sockets.adapter.rooms);
  }

  @SubscribeMessage(ChatRequestEvents.CREATE)
  async onChatCreate(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() body: CreateChatDto,
  ) {
    const clearIds = Array.from(
      new Set([...body.members, client.data.user.id]),
    );
    const chat = await this.chatsService.create({
      members: clearIds,
      name: body.name,
      ownerId: client.data.user.id,
      type: body.type,
      visibility: body.visibility,
    });

    await this.wsService.createRoomWithMembers(
      this.server,
      chat.memberIds,
      chat,
    );
  }

  @SubscribeMessage(ChatRequestEvents.DELETE)
  async onChatDelete(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() body: { chatId: string },
  ) {
    const deletedChat = await this.chatsService.deleteChatByOwner(
      client.data.user.id,
      body.chatId,
    );
    await this.wsService.traversAllSockets(
      this.server,
      new Set(deletedChat.memberIds),
      (socket) => {
        socket.emit(ChatServerEvents.DELETED, { chatId: deletedChat.id });
      },
    );
  }

  @SubscribeMessage(ChatRequestEvents.JOIN)
  async onJoin(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() body: { chatId: string },
  ) {
    const { chat, newUser } = await this.chatsService.addMember(
      body.chatId,
      client.data.user.id,
    );
    await client.join(body.chatId);
    this.server
      .to(body.chatId)
      .emit(ChatServerEvents.NEW_MEMBER, { chatId: chat.id, newUser });
  }

  @SubscribeMessage(ChatRequestEvents.LEAVE)
  async onLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string },
  ): Promise<void> {
    const room = body.chatId;
    await client.leave(room);
    this.server.to(room).emit(ChatServerEvents.LEFT, { chatId: room });
  }

  @SubscribeMessage(ChatRequestEvents.REMOVE_MEMBER)
  async onDeleteMember(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() body: { chatId: string; memberId: string },
  ): Promise<void> {
    await this.chatsService.deleteMember({
      chatId: body.chatId,
      memberToDeleteId: body.memberId,
      authedUserId: client.data.user.id,
    });
    const data = {
      chatId: body.chatId,
      member: body.memberId,
    };
    await this.wsService.disconnectAllUserSockets(
      this.server,
      body.memberId,
      (disconnectedSocket) => {
        disconnectedSocket.emit(ChatServerEvents.REMOVED_FROM_CHAT, data);
      },
    );
    this.server.to(body.chatId).emit(ChatServerEvents.MEMBER_REMOVED, data);
  }

  @SubscribeMessage(MessageRequestEvents.SEND)
  async onMessage(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() body: { chatId: string; text: string },
  ): Promise<void> {
    const msg = await this.messagesService.create({
      chatId: body.chatId,
      text: body.text,
      authorId: client.data.user.id,
    });
    this.server.to(body.chatId).emit(MessageServerEvents.NEW, msg);
  }

  @SubscribeMessage(MessageRequestEvents.TYPING)
  onTyping(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() body: { chatId: string; isTyping: boolean },
  ) {
    const data = {
      chatId: body.chatId,
      user: client.data.user,
      isTyping: body.isTyping,
    };

    client.to(data.chatId).emit(MessageServerEvents.TYPING, data);
  }
}
