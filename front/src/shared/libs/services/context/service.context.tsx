import {  createContext } from 'react';
import { ChatService } from '../chatService/chat.service.ts';
import { AuthService } from '../authService/auth.service.ts';
import { UserService } from '../userService/user.service.ts';
import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';

interface IServices {
  http: HttpService
  socket: SocketService
  chat:  ChatService
  auth:  AuthService
  user:  UserService
}
export interface CtxProps {
  services:  IServices;
  updateToken : (token: string) => void;
}
export const Ctx = createContext<CtxProps | null>(null);
