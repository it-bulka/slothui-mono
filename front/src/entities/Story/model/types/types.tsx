import type { EntityState } from '@reduxjs/toolkit';

// slice
export interface Story {
  id: string;
  userId: string;
  url: string;
  type: 'image' | 'video';
  createdAt: string;
  expiresAt: string;
  isViewed: boolean;
}

export interface StoriesUserMeta {
  userId: string;
  nickname: string;
  avatarUrl: string;

  storyIds: string[];

  totalStories: number;
  viewedStories: number;
  hasUnseen: boolean;

  lastStoryAt: string;

  // cashed
  lastFetched?: number;
}

export interface StoriesState extends EntityState<Story, string>{
  storiesByUser: Record<string, StoriesUserMeta>; // userId -> StoriesUserMeta
  viewedQueue: string[]

  usersOrder: string[]; // порядок кружків

  cursor?: string | null;
  hasMore: boolean;
  isLoading: boolean;

  error?: string | null;

  // cached
  lastFetchedAll?: number;
}

// ui
export interface StoryWrapperProps {
  duration: number
}