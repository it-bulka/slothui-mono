import { PaginatedResponse } from '../../common/types/pagination.type';
import { UserResponse } from '../../user/dto/user-response.dto';

type UserData = Pick<
  UserResponse,
  'id' | 'username' | 'nickname' | 'avatarUrl'
>;
export interface StoryDto {
  id: string;
  url: string;
  publicId: string;
  type: 'image' | 'video';
  duration?: number;
  createdAt: string; // ISOString
}

export type UserWithStory = UserData & {
  lastStoryDate: string;
  totalStories: number;
  viewedStories: number;
  hasUnseen: boolean;
};

export type StoryPaginatedRes = PaginatedResponse<StoryDto>;
export type UsersWithStoryPaginatedRes = PaginatedResponse<UserWithStory>;
