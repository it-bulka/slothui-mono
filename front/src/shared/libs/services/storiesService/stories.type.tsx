export interface StoryDTO {
  id: string;
  url: string;
  type: 'image' | 'video';
  duration?: number;
  isViewed?: boolean;
}

export type UserStories = {
  userId: string;
  username: string;
  avatar: string
  storiesAmount: number
  stories: StoryDTO[];
};

export type StoryFormData = {
  file: File;
};