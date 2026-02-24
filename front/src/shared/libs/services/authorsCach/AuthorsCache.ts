import type { Author } from '@/shared/types';
import { HttpService } from '../httpService/http.service.ts';

export class AuthorCache {
  private cache: Record<string, Author> = {};

  constructor(
    private readonly http: HttpService
  ) {}

  get(id: string) {
    return this.cache[id] || null;
  }

  set(author: Author) {
    this.cache[author.id] = author;
  }

  async fetchIfMissing(id: string): Promise<Author> {
    const cached = this.get(id);
    if (cached) return cached;

    const author = await this.http.request<Author>(`/api/users/${id}`);
    this.set(author);
    return author;
  }
}