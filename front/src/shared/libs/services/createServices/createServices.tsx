import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';
import { ChatService } from '../chatService/chat.service.ts';
import { UserService } from '../userService/user.service.ts';
import { AuthService } from '../authService/auth.service';

export const createServices = (token = '') => {
  const httpService = new HttpService(token)
  const socketService = new SocketService(token)

  return {
    http: httpService,
    socket: socketService,
    auth: new AuthService(httpService),
    user: new UserService(httpService),
    chat: new ChatService(httpService, socketService)
  }
}