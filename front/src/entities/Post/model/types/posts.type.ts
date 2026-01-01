import type { EntityState } from '@reduxjs/toolkit';
import type { PostWithAttachmentsDto } from '@/shared/types';

export type FeedState = {
  ids: string[]        // ordered posts
  isLoading: boolean
  error?: string
  hasMore: boolean
  nextCursor?: string | null
}

export interface PostsState extends EntityState<PostWithAttachmentsDto, string>{
  home: FeedState;
  profile: Record<string, FeedState>
  saves: FeedState;
  likes: FeedState;
}
