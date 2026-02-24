import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';
import { ChatService } from '../chatService/chat.service.ts';
import { UserService } from '../userService/user.service.ts';
import { AuthService } from '../authService/auth.service';
import { EventsService } from '../eventsService/events.service.tsx';
import { StoriesService } from '../storiesService/stories.service.ts';
import { MessagesService } from '../messagesService/messages.service.ts';
import { CommentsService } from '../commentsService/comments.service.ts';
import { PostsService } from '../postsService/posts.service.ts';
import { PollService } from '../pollService/poll.service.ts';
import { FriendsService } from '../friendsService/friends.service.ts';
import {
  NotificationsCountersService
} from '../notificationsCountersService/notificationsCounters.service.ts';
import { SessionsService } from '../sessionsService/sessions.service.ts';
import { TokenManager } from '../tokenManager/TokenManager.ts';
import { AuthorCache } from '../authorsCach/AuthorsCache.ts';

export const createServices = () => {
  const tokenManager = new TokenManager();

  const httpService = new HttpService(tokenManager)
  const socketService = new SocketService(tokenManager)

  return {
    tokenManager,
    http: httpService,
    socket: socketService,
    auth: new AuthService(httpService),
    user: new UserService(httpService),
    chat: new ChatService(httpService, socketService),
    events: new EventsService(httpService),
    stories: new StoriesService(httpService),
    messages: new MessagesService(httpService, socketService),
    authors: new AuthorCache(httpService),
    comments: new CommentsService(httpService, socketService),
    posts: new PostsService(httpService),
    poll: new PollService(httpService),
    friends: new FriendsService(httpService, socketService),
    notificationsCounters: new NotificationsCountersService(httpService),
    sessions: new SessionsService(httpService),
  }
}