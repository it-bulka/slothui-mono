import { createCoreServices, type CoreServices } from '../createCoreServices/createCoreServices.ts';
import type { SocketService } from '../socketService/socket.service.ts';
import type { ChatService } from '../chatService/chat.service.ts';
import type { UserService } from '../userService/user.service.ts';
import type { EventsService } from '../eventsService/events.service.tsx';
import type { StoriesService } from '../storiesService/stories.service.ts';
import type { MessagesService } from '../messagesService/messages.service.ts';
import type { CommentsService } from '../commentsService/comments.service.ts';
import type { PostsService } from '../postsService/posts.service.ts';
import type { PollService } from '../pollService/poll.service.ts';
import type { FriendsService } from '../friendsService/friends.service.ts';
import type { NotificationsCountersService } from '../notificationsCountersService/notificationsCounters.service.ts';
import type { NotificationsService } from '../notificationsService/notifications.service.ts';
import type { SessionsService } from '../sessionsService/sessions.service.ts';
import type { AuthorCache } from '../authorsCach/AuthorsCache.ts';

export class ServicesFacade {
  // Core — available immediately
  readonly tokenManager: CoreServices['tokenManager'];
  readonly http: CoreServices['http'];
  readonly auth: CoreServices['auth'];

  // Feature — populated after initFeatureServices()
  socket!: SocketService;
  user!: UserService;
  chat!: ChatService;
  events!: EventsService;
  stories!: StoriesService;
  messages!: MessagesService;
  authors!: AuthorCache;
  comments!: CommentsService;
  posts!: PostsService;
  poll!: PollService;
  friends!: FriendsService;
  notificationsCounters!: NotificationsCountersService;
  notifications!: NotificationsService;
  sessions!: SessionsService;

  private _featureReady = false;
  private readonly _core: CoreServices;

  constructor() {
    this._core = createCoreServices();
    this.tokenManager = this._core.tokenManager;
    this.http = this._core.http;
    this.auth = this._core.auth;
  }

  async initFeatureServices(): Promise<void> {
    if (this._featureReady) return;
    const { createFeatureServices } = await import('../createFeatureServices/createFeatureServices.ts');
    Object.assign(this, createFeatureServices(this._core));
    this._featureReady = true;
  }

  get isFeatureReady(): boolean {
    return this._featureReady;
  }
}
