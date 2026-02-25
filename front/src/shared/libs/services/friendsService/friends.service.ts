import { HttpService } from '../httpService/http.service.ts';
import type {
  NewFriendNotification,
  FriendDto,
  PaginatedResponse,
} from '../../../types';
import { Subject, Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import { SocketService } from '../socketService/socket.service.ts';
import { type FollowersUpdateData, FriendsServerEvents } from './friends.events.ts';

export class FriendsService {
  private BASE_URL = '/api/friends';

  private readonly followersNew$ = new Subject<NewFriendNotification>();
  private readonly followersUpdate$ = new Subject<FollowersUpdateData>();

  private socket: Socket | undefined;

  constructor(
    private readonly http: HttpService,
    private readonly wsService: SocketService
  ) {
    wsService.onConnected(() => {
      this.socket = wsService.socket
      this.init()
    })
  }

  /** GET /api/friends/followers */
  async getFollowers({ cursor, userId }: { cursor?: string | null, userId?: string } = {}): Promise<PaginatedResponse<FriendDto> & { followersLastViewedAt: number }> {
    return await this.http.request<PaginatedResponse<FriendDto> & { followersLastViewedAt: number }>(
      this.BASE_URL + '/followers',
      { params: { cursor, userId } },
    );
  }

  /** DELETE /api/friends/followers */
  async removeFollower({ userId }: { userId: string }): Promise<FriendDto> {
    return await this.http.request<FriendDto>(
      `${this.BASE_URL}/followers/${userId}`,
      { method: 'DELETE' },
    );
  }

  /** DELETE /api/friends/followee/:userId */
  async unfollow({ userId }: { userId: string }): Promise<FriendDto> {
    return await this.http.request<FriendDto>(
      `${this.BASE_URL}/followee/${userId}`,
      { method: 'DELETE' },
    );
  }

  //

  /** GET /api/friends/followings */
  async getFollowings({ cursor, userId }: { cursor?: string | null, userId?: string } = {}): Promise<PaginatedResponse<FriendDto>> {
    return await this.http.request<PaginatedResponse<FriendDto>>(
      this.BASE_URL + '/followings',
      { params: { cursor, userId } },
    );
  }

  /** GET /api/friends/suggestion */
  async getSuggestions({ cursor, userId }: { cursor?: string | null, userId?: string } = {}): Promise<PaginatedResponse<FriendDto>> {
    return await this.http.request<PaginatedResponse<FriendDto>>(
      this.BASE_URL + '/suggestion',
      { params: { cursor, userId }, },
    );
  }

  /** POST /api/friends */
  async followUser({ userId }: { userId: string }): Promise<FriendDto> {
    return await this.http.request<FriendDto>(
      this.BASE_URL,
      {
        body: { userId },
        method: 'POST',
      },
    );
  }

  /** POST /api/friends/confirmation */
  async confirmFriend({ userId }: { userId?: string } = {}): Promise<FriendDto> {
    return await this.http.request<FriendDto>(
      this.BASE_URL + '/confirmation',
      {
        body: { userId },
        method: 'POST',
      },
    );
  }

  /** POST /api/friends/followers/markSeen  timestamp */
  async markFollowersSeen(): Promise<number> {
    return await this.http.request<number>(
      this.BASE_URL + '/followers/markSeen',
      {
        method: 'POST',
      },
    );
  }

  /* ------------------------------------------------------------------ */
    /*                         ---- Websocket ----                      */
  /* ------------------------------------------------------------------ */

  private init() {
    this.registerEvents()

    this.wsService.$reconnected.subscribe(() => {
      this.socket = this.wsService.socket;
      this.offEvents()
      this.registerEvents()
    })
  }

  private registerEvents(){
    /* events from Server → Subject */
    const socket = this.socket
    if(!socket) throw this.wsService.callNoConnectionError()
    socket.on(FriendsServerEvents.NEW_FOLLOWER,         (m: NewFriendNotification) => this.followersNew$.next(m));
    socket.on(FriendsServerEvents.UPDATE_FOLLOWERS,     (m: FollowersUpdateData) => this.followersUpdate$.next(m));
  }

  private offEvents() {
    const socket = this.socket
    if(!socket) return;
    socket.off(FriendsServerEvents.NEW_FOLLOWER)
  }

  /* ------------------------------------------------------------------ */
  /*                         ---- Observables ----                      */
  /* ------------------------------------------------------------------ */

  // global
  onNewFollower(): Observable<NewFriendNotification> {
    return this.followersNew$.asObservable();
  }

  onFollowersUpdate(): Observable<FollowersUpdateData> {
    return this.followersUpdate$.asObservable();
  }
}