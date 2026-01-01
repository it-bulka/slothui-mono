import { GroupedAttachment } from '../../attachments/types/attachments.type';
import { PaginatedResponse } from '../../common/types/pagination.type';
import { UserResponse } from '../../user/dto/user-response.dto';
import { PollDto } from '../../polls/dto/poll.dto';

export interface PostDto {
  id: string;
  content: string;
  author: UserResponse;
  isLiked?: boolean;
  isSaved?: boolean;
  commentsCount: number;
  attachments?: GroupedAttachment;
  poll?: PollDto;
}

export type PostPaginatedRes = PaginatedResponse<PostDto>;
