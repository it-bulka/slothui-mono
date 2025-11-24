import { GroupedAttachment } from '../../attachments/types/attachments.type';
import { PaginatedResponse } from '../../common/types/pagination.type';
import { UserResponse } from '../../user/dto/user-response.dto';

export interface PostDto {
  id: string;
  content: string;
  author: UserResponse;
  isLiked?: boolean;
  isSaved?: boolean;
  attachments?: GroupedAttachment;
}

export type PostPaginatedRes = PaginatedResponse<PostDto>;
