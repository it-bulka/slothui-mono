import { HttpService } from '../httpService/http.service.ts';
import type { StoryFormData, UserStories } from './stories.type.tsx';
import type { PaginatedResponse } from '@/shared/types';

export class StoriesService {
  constructor(
    private readonly http: HttpService,
  ) {}

  /* ------------------------------------------------------------------ */
  /*                       ---- REST over fetch ----                    */
  /* ------------------------------------------------------------------ */

  /** GET /api/stories?cursor&limit=50 */
  async listUserWithStories(cursor?: string | null): Promise<PaginatedResponse<UserStories>> {
    const res = await this.http.request<PaginatedResponse<UserStories>>(
      `/api/stories`,
      { params: { cursor, limit: 50 } },
    );
    return res;
  }

  /** GET /api/stories/batch?ids=a,b,s */
  async batchStories(userIds: string[]): Promise<UserStories[]> {
    const res = await this.http.request<{ items: UserStories[] }>(
      `/api/stories`,
      { params: { ids: userIds.join(',') } },
    );
    return res.items;
  }

  /** GET /api/stories?userId=:id */
  async getUserStories(userId: string): Promise<UserStories> {
    return await this.http.request<UserStories>(
      `/api/stories`,
      { params: { userId } },
    );
  }

  /** POST /api/stories StoryFormData */
  async createStory(data: StoryFormData): Promise<UserStories> {
    return this.http.request<UserStories>(
      '/api/stories',
      { method: 'POST', body: data },
    );
  }

  /** DELETE /api/stories/:id   id:string */
  async deleteEvent(id:string): Promise<void> {
    await this.http.request(
      `/api/stories/${id}`,
      { method: 'DELETE' },
    );
  }

  /** POST /api/stories/viewed    string[] */
  async markStoriesVied(batch: string[]): Promise<void> {
    await this.http.request(
      `/api/stories/viewed`,
      { method: 'POST', body: batch },
    );
  }

  /** POST /api/stories/:storyId/messages { text, ownerId } */
  async sendMessage({ storyId, text, ownerId }: { storyId: string, ownerId: string, text: string }): Promise<void> {
    await this.http.request<void>(
      `/api/stories/${storyId}/messages`,
      { method: 'POST', body: { text, ownerId } },
    );
  }
}