import { HttpService } from '../httpService/http.service.ts';
import type { PaginatedResponse } from '@/shared/types';
import type { FriendDto } from '@/shared/types';

export class FriendsService {
  private BASE_URL = '/api/friends';
  constructor(
    private readonly http: HttpService,
  ) {}

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
}