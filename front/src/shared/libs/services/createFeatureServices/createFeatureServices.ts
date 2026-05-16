import { SocketService } from '../socketService/socket.service.ts';
import { ChatService } from '../chatService/chat.service.ts';
import { UserService } from '../userService/user.service.ts';
import { EventsService } from '../eventsService/events.service.tsx';
import { StoriesService } from '../storiesService/stories.service.ts';
import { MessagesService } from '../messagesService/messages.service.ts';
import { CommentsService } from '../commentsService/comments.service.ts';
import { PostsService } from '../postsService/posts.service.ts';
import { PollService } from '../pollService/poll.service.ts';
import { FriendsService } from '../friendsService/friends.service.ts';
import { NotificationsCountersService } from '../notificationsCountersService/notificationsCounters.service.ts';
import { NotificationsService } from '../notificationsService/notifications.service.ts';
import { SessionsService } from '../sessionsService/sessions.service.ts';
import { AuthorCache } from '../authorsCach/AuthorsCache.ts';
import type { CoreServices } from '../createCoreServices/createCoreServices.ts';

export const createFeatureServices = (core: CoreServices) => {
  const socketService = new SocketService(core.tokenManager);
  return {
    socket: socketService,
    user: new UserService(core.http, socketService),
    chat: new ChatService(core.http, socketService),
    events: new EventsService(core.http),
    stories: new StoriesService(core.http),
    messages: new MessagesService(core.http, socketService),
    authors: new AuthorCache(core.http),
    comments: new CommentsService(core.http, socketService),
    posts: new PostsService(core.http),
    poll: new PollService(core.http),
    friends: new FriendsService(core.http, socketService),
    notificationsCounters: new NotificationsCountersService(core.http),
    notifications: new NotificationsService(core.http),
    sessions: new SessionsService(core.http),
  };
};

export type FeatureServices = ReturnType<typeof createFeatureServices>;
