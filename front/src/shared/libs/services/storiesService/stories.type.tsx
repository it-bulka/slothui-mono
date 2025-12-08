export interface StoryDTO {
  id: string;
  url: string;
  type: 'image' | 'video';
  duration?: number | null;
  isViewed?: boolean;
  user: {
    id: string;
    nickname: string;
    name: string;
    avatarUrl: string
  }
}

export type UserStories = {
  userId: string;
  username: string;
  avatar: string
  storiesAmount: number
  stories: Omit<StoryDTO, 'user'>[];
};

export type StoryFormData = {
  file: File;
};