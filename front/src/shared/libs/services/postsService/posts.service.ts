import type { CreatePostDTO, UpdatePostDTO } from './posts.types.ts';
import { HttpService } from '../httpService/http.service.ts';
import type { PostWithAttachmentsDto } from '@/shared/types';
import type { PaginatedResponse } from '@/shared/types';

export class PostsService {
  private BASE_URL = '/api/posts';
  constructor(
    private readonly http: HttpService,
  ) {}

  /** GET /api/posts */
  async getList({ cursor, userId }: { cursor?: string | null, userId?: string } = {}): Promise<PaginatedResponse<PostWithAttachmentsDto>> {
    return await this.http.request<PaginatedResponse<PostWithAttachmentsDto>>(
      this.BASE_URL,
      { params: { cursor, userId } },
    );
  }

  /** GET /api/posts/saved */
  async getSavedPosts({ cursor }: { cursor?: string | null } = {}): Promise<PaginatedResponse<PostWithAttachmentsDto>> {
    return await this.http.request<PaginatedResponse<PostWithAttachmentsDto>>(
      `${this.BASE_URL}/saved`,
      { params: { cursor } },
    );
  }

  /** GET /api/posts/liked */
  async getLikedPosts({ cursor }: { cursor?: string | null } = {}): Promise<PaginatedResponse<PostWithAttachmentsDto>> {
    return await this.http.request<PaginatedResponse<PostWithAttachmentsDto>>(
      `${this.BASE_URL}/liked`,
      { params: { cursor } },
    );
  }

  /** GET /api/posts/:postId */
  async getOne({ id }: { id: string }): Promise<PostWithAttachmentsDto> {
    return await this.http.request<PostWithAttachmentsDto>(
      `${this.BASE_URL}/${id}`,
    );
  }

  /** POST /api/posts/:postId */
  async createOne({ attachments, text }: CreatePostDTO): Promise<PostWithAttachmentsDto> {
    return await this.http.request<PostWithAttachmentsDto>(
      this.BASE_URL,
      { method: 'POST', body: { text, attachments } },
    );
  }

  /** DELETE /api/posts/:postId */
  async deleteOne({ id }: { id: string }): Promise<void> {
    await this.http.request(
      `${this.BASE_URL}/${id}`
    );
  }

  /** PATCH /api/posts/:postId */
  async updateOne({ toAdd, toRemove, text, postId }: UpdatePostDTO): Promise<PostWithAttachmentsDto> {
    return await this.http.request<PostWithAttachmentsDto>(
      `${this.BASE_URL}/${postId}`,
      { method: 'PATCH', body: { text, toAdd, toRemove } },
    );
  }

  /** POST /api/posts/:postId/like */
  async likePost(postId: string): Promise<void> {
    return this.http.request(`${this.BASE_URL}/${postId}/like`, { method: 'POST' });
  }

  /** DELETE /api/posts/:postId/like */
  async unlikePost(postId: string): Promise<void> {
    return this.http.request(`${this.BASE_URL}/${postId}/like`, { method: 'DELETE' });
  }

  /** POST /api/posts/:postId/save */
  async savePost(postId: string): Promise<void> {
    return this.http.request(`${this.BASE_URL}/${postId}/save`, { method: 'POST' });
  }

  /** DELETE /api/posts/:postId/save */
  async unsavePost(postId: string): Promise<void> {
    return this.http.request(`${this.BASE_URL}/${postId}/save`, { method: 'DELETE' });
  }
}