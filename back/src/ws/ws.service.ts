import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatServerEvents } from './types/chat.events';
import { SocketWithUser } from './types/socketWithUser.type';
import { AuthService } from '../auth/auth.service';
import { ChatDetailsDTO } from '../chats/types/chat.type';
import { WS_PREFIXES } from '../common/consts/ws-prefixes';
import { ChatsService } from '../chats/chats.service';

@Injectable()
export class WsService {
  constructor(
    private readonly authService: AuthService,
    private readonly chatsService: ChatsService,
  ) {}
  configUserRoomName(userId: string) {
    return WS_PREFIXES.setUserPrefix(userId);
  }

  configChatRoomName(chatId: string) {
    return WS_PREFIXES.setChatPrefix(chatId);
  }

  getAllUserSocketIds(server: Server, userId: string) {
    const room = this.configUserRoomName(userId);
    return server.sockets.adapter.rooms.get(room);
  }

  async traversAllSockets(
    server: Server,
    socketsIds: Set<string>,
    cb: (socket: Socket) => void | Promise<void>,
  ) {
    for (const id of socketsIds) {
      const socket = server.sockets.sockets.get(id);
      if (!socket) return;
      await cb?.(socket);
    }
  }

  async disconnectAllUserSockets(
    server: Server,
    userId: string,
    preDisconnectCb?: (disconnectedSocket: Socket) => void,
  ) {
    const socketsIds = this.getAllUserSocketIds(server, userId);
    if (!socketsIds) return;
    await this.traversAllSockets(server, socketsIds, (socket) => {
      preDisconnectCb?.(socket);
      socket.disconnect(true);
    });
  }

  async addUserToPersonalRoom(userId: string, socket: Socket) {
    await socket.join(this.configUserRoomName(userId));
  }

  async addToChatRoom(chatId: string, socket: Socket) {
    const chatRoom = this.configChatRoomName(chatId);
    await socket.join(chatRoom);
  }

  async deleteFromChatRoom(chatId: string, socket: Socket) {
    const chatRoom = this.configChatRoomName(chatId);
    await socket.leave(chatRoom);
  }

  async createRoomWithMembers(
    server: Server,
    membersIds: string[],
    chat: ChatDetailsDTO,
  ) {
    const allSockets: Socket[] = [];
    membersIds.forEach((memberId) => {
      const socketsIds = this.getAllUserSocketIds(server, memberId);

      if (!socketsIds) return;
      for (const id of socketsIds) {
        const socket = server.sockets.sockets.get(id);
        if (!socket) return;
        allSockets.push(socket);
      }
    });

    await Promise.all(
      allSockets.map(async (socket) => {
        await this.addToChatRoom(chat.id, socket);
        socket.emit(ChatServerEvents.CREATED, chat);
      }),
    );
  }

  authMiddleware(server: Server) {
    server.use((socket, next) => {
      void (async () => {
        try {
          const token = socket.handshake.auth?.token as string;
          if (!token) throw new Error('Token missing');
          const user = await this.authService.validateAccessToken(token);
          (socket as SocketWithUser).data.user = user;
          await this.addUserToPersonalRoom(user.id, socket);
          next();
        } catch (err) {
          next(err instanceof Error ? err : new Error(String(err)));
        }
      })();
    });
  }

  // //

  async activateAllUserChatsRooms(userId: string, socket: Socket) {
    const chatsIds = await this.chatsService.getAllUserChatsIds(userId);
    const fns = chatsIds.map(({ chatId }) => {
      return this.addToChatRoom(chatId, socket);
    });

    await Promise.all(fns);
  }
}
