import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatServerEvents } from './types/chat.events';
import { SocketWithUser } from './types/socketWithUser.type';
import { AuthService } from '../auth/auth.service';
import { ChatDetailsDTO } from '../chats/types/chat.type';

@Injectable()
export class WsService {
  constructor(private readonly authService: AuthService) {}
  configUserRoomName(userId: string) {
    return `user:${userId}`;
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
        await socket.join(chat.id);
        socket.emit(ChatServerEvents.CREATED, chat);
      }),
    );
  }

  authMiddleware(server: Server) {
    server.use((socket, next) => {
      void (async () => {
        try {
          const authHeader = socket.handshake.headers['authorization'];
          const token = this.authService.getBearerToken(authHeader);
          const user = await this.authService.validateAccessToken(token);
          (socket as SocketWithUser).data.user = user;
          await this.addUserToPersonalRoom(user.id, socket);
          next();
        } catch (err) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log('error', err.message);
          next(err instanceof Error ? err : new Error(String(err)));
        }
      })();
    });
  }
}
