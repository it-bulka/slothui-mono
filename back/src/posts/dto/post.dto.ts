import { GroupedAttachment } from '../../attachments/types/attachments.type';
import { PaginatedResponse } from '../../common/types/pagination.type';
import { UserResponse } from '../../user/dto/user-response.dto';
import { PollResultDto } from '../../polls/dto/poll.dto';

export interface PostDto {
  id: string;
  text: string;
  author: UserResponse;
  isLiked?: boolean;
  isSaved?: boolean;
  commentsCount: number;
  attachments?: GroupedAttachment;
  poll?: PollResultDto;
}

export type PostPaginatedRes = PaginatedResponse<PostDto>;
