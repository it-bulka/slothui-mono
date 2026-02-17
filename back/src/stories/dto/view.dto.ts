import { UserResponse } from '../../user/dto/user-response.dto';
import { PaginatedResponse } from '../../common/types/pagination.type';

export type ViewDto = {
  id: string;
  viewedAt: string;
  viewer: Pick<UserResponse, 'id' | 'username' | 'nickname' | 'avatarUrl'>;
};

export type ViewsPaginatedResponse = PaginatedResponse<ViewDto>;
