import type { UserStories } from '@/shared/libs/services';
import type { Story, StoriesUserMeta } from '../types/types';

export const parseUserStories = (users: UserStories[]): { stories: Story[], usersMeta: StoriesUserMeta[] } => {
  const stories: Story[] = [];
  const usersMeta: StoriesUserMeta[] = [];

  users.forEach(user => {
    const storyIds: string[] = [];

    user.stories.forEach(story => {
      const s: Story = {
        ...story,
        userId: user.userId,
        isViewed: story.isViewed || false,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24*60*60*1000).toISOString(), // тимчасово
      };
      stories.push(s);
      storyIds.push(s.id);
    });

    usersMeta.push({
      userId: user.userId,
      nickname: user.username,
      avatarUrl: user.avatar,
      storyIds,
      totalStories: user.storiesAmount,
      viewedStories: user.stories.filter(s => s.isViewed).length,
      hasUnseen: user.stories.some(s => !s.isViewed),
      lastStoryAt: user.stories[user.stories.length-1]?.createdAt || '',
    });
  });

  return { stories, usersMeta };
};
