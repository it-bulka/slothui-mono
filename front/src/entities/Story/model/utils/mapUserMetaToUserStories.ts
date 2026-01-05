import type { StoriesUserMeta, Story } from '../types/types.tsx';
import type { UserStories } from '@/shared/libs/services';

export const mapUserMetaToUserStories = (
  userMeta: StoriesUserMeta,
  entities: Record<string, Story>
): UserStories => ({
  userId: userMeta.userId,
  username: userMeta.nickname,
  avatar: userMeta.avatarUrl,
  storiesAmount: userMeta.totalStories,
  stories: userMeta.storyIds
    .map(id => entities[id])
    .filter(Boolean)
});