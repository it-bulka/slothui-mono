import { AttachmentDto } from '../../attachments/dto/attachment.dto';
import { PaginatedResponse } from '../../common/types/pagination.type';
import { UserResponse } from '../../user/dto/user-response.dto';
import { PollResultDto } from '../../polls/dto/poll.dto';

export interface PostDto {
  id: string;
  text: string;
  author: UserResponse;
  isLiked?: boolean;
  isSaved?: boolean;
  likesCount: number;
  commentsCount: number;
  attachments?: AttachmentDto[];
  poll?: PollResultDto;
}

export type PostPaginatedRes = PaginatedResponse<PostDto>;
