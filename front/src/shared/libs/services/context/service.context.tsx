import {  createContext } from 'react';
import { ChatService } from '../chatService/chat.service.ts';
import { AuthService } from '../authService/auth.service.ts';
import { UserService } from '../userService/user.service.ts';
import { EventsService } from '../eventsService/events.service.tsx';
import { StoriesService } from '../storiesService/stories.service.ts';
import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';
import { MessagesService } from '../messagesService/messages.service.ts';
import { CommentsService } from '../commentsService/comments.service.ts';
import { PostsService } from '../postsService/posts.service.ts';

interface IServices {
  http: HttpService
  socket: SocketService
  chat:  ChatService
  auth:  AuthService
  user:  UserService
  events: EventsService
  stories: StoriesService
  messages:  MessagesService
  comments:  CommentsService
  posts:  PostsService
}
export interface CtxProps {
  services:  IServices;
  updateToken : (token: string) => void;
}
export const Ctx = createContext<CtxProps | null>(null);
