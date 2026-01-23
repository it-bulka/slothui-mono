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
import { UseFilters, OnModuleInit } from '@nestjs/common';
import { GatewayExceptionsFilter } from './filters/exceptions.filter';
import { ValidateDtoPipe } from './pipes/validateDto.pipe';
import { EventEmitterMessageService } from '../event-emitter/event-emitter-message.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MsgEmitterType } from '../event-emitter/type/msgEmitter.type';
import { EventEmitterNotificationService } from '../event-emitter/event-emitter-notification.service';
import {
  NotificationEmitterType,
  NotificationEvent,
} from '../event-emitter/type/notification.type';
import { OpenedChatsTracker } from '../messages/opened-chats-tracker.service';
import { UnreadBufferService } from '../messages/unread-buffer.service';

@ValidateDtoPipe()
@UseFilters(GatewayExceptionsFilter)
@WebSocketGateway({
  path: '/ws',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class WsGateway
  implements OnGatewayInit, OnModuleInit, OnGatewayConnection
{
  @WebSocketServer() server: Server;
  private msgEvent$: Observable<MsgEmitterType>;
  private notificationEvent$: Observable<NotificationEmitterType>;

  private interval: NodeJS.Timeout;

  constructor(
    private readonly wsService: WsService,
    private readonly messagesService: MessagesService,
    private readonly chatsService: ChatsService,
    private readonly msgEmitterService: EventEmitterMessageService,
    private readonly notificationEmitterService: EventEmitterNotificationService,
    private readonly openedChatsTracker: OpenedChatsTracker,
    private readonly unreadBufferService: UnreadBufferService,
  ) {
    this.msgEvent$ = msgEmitterService.getEvent();
    this.notificationEvent$ = notificationEmitterService.getEvent();
  }

  onModuleInit() {
    this.msgEvent$
      .pipe(filter((event) => event.meta?.local))
      .subscribe((event) => {
        // TODO: add redis later
        switch (event.ev) {
          // MESSAGES SERVER
          case MessageServerEvents.CREATED:
            this.server
              .to(event.data.chatId)
              .except(event.data.authorId)
              .emit(event.ev, event.data);
            break;
          default:
            return;
        }
      });

    this.notificationEvent$
      .pipe(filter((event) => event.meta?.local))
      .subscribe((event) => {
        switch (event.ev) {
          case NotificationEvent.FRIEND_REQUEST:
          case NotificationEvent.FRIEND_CONFIRMATION:
          case NotificationEvent.MSG_NEW:
            this.server.to(event.meta.userId).emit(event.ev, event.data);
            break;
          default:
            return;
        }
      });
  }
  afterInit(server: Server) {
    this.wsService.authMiddleware(server);

    this.interval = setInterval(() => {
      const batches = this.unreadBufferService.flushAll();

      for (const batch of batches) {
        this.server
          .to(`user:${batch.userId}`)
          .emit(ChatServerEvents.UNREAD_BATCH, batch);
      }
    }, 1000);
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
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() body: { chatId: string },
  ): Promise<void> {
    const room = body.chatId;
    await client.leave(room);
    this.server.to(room).emit(ChatServerEvents.LEFT, { chatId: room });
    this.openedChatsTracker.closeChat(client.data.user.id, body.chatId);
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

  @SubscribeMessage(ChatRequestEvents.ENTER)
  async onChatEnter(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() body: { chatId: string },
  ) {
    const { chatId } = body;
    const userId = client.data.user.id;
    await this.chatsService.markChatAsRead(chatId, userId);

    this.openedChatsTracker.openChat(client.data.user.id, body.chatId);
    this.unreadBufferService.clear(chatId, userId);

    client.emit(ChatServerEvents.UNREAD_SYNC, { chatId, unread: 0 });
  }
}
