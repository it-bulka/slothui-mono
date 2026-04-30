import { HttpService } from '../httpService/http.service.ts';
import type { StoryDTO, StoryFormData, UserStories } from './stories.type.tsx';
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

  /** GET /api/stories/users/:userId */
  async getUserStories(userId: string): Promise<UserStories> {
    return await this.http.request<UserStories>(
      `/api/stories/users/${userId}`,
    );
  }

  /** POST /api/stories — multipart/form-data */
  async createStory(data: StoryFormData): Promise<StoryDTO> {
    const formData = new FormData();
    formData.append('file', data.file);
    return this.http.request<StoryDTO>(
      '/api/stories',
      { method: 'POST', body: formData },
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

}