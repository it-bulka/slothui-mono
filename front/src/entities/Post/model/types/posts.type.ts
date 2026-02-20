import type { EntityState } from '@reduxjs/toolkit';
import type { PostWithAttachmentsDto } from '@/shared/types';

export type FeedState = {
  ids: string[]        // ordered posts
  isLoading: boolean
  error?: string
  hasMore: boolean
  nextCursor?: string | null
  lastFetchedAt?: number // Date.now()
}

export type PostWithAttachmentsUI = PostWithAttachmentsDto & {
  isTogglingLike?: boolean;
  isTogglingSave?: boolean;
};

export interface PostsState extends EntityState<PostWithAttachmentsUI, string>{
  home: FeedState;
  profile: Record<string, FeedState>
  saves: FeedState;
  likes: FeedState;
}
