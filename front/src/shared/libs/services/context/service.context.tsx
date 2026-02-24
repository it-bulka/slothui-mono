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
import { FriendsService } from '../friendsService/friends.service.ts';
import {
  NotificationsCountersService
} from '../notificationsCountersService/notificationsCounters.service.ts';
import { PollService } from '../pollService/poll.service.ts';
import { SessionsService } from '../sessionsService/sessions.service.ts';
import { AuthorCache } from '@/shared/libs/services/authorsCach/AuthorsCache.ts';

export interface IServices {
  http: HttpService
  socket: SocketService
  chat:  ChatService
  auth:  AuthService
  user:  UserService
  events: EventsService
  stories: StoriesService
  messages:  MessagesService
  authors: AuthorCache
  comments:  CommentsService
  posts:  PostsService
  poll:  PollService
  friends:  FriendsService
  notificationsCounters:  NotificationsCountersService
  sessions:  SessionsService
}
export interface CtxProps {
  services:  IServices;
  updateToken : (token: string) => void;
}
export const Ctx = createContext<CtxProps | null>(null);
