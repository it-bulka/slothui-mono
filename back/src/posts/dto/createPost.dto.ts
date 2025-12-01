import { Files } from '../../attachments/types/attachments.type';
import { CreatePollDto } from '../../polls/dto/createPoll.dto';

export interface CreatePostDtoWithFiles {
  text: string;
  files: Partial<Files>;
}

export interface CreatePostDtoWithPoll {
  text: string;
  poll: CreatePollDto;
}

export type CreatePostDto = CreatePostDtoWithFiles | CreatePostDtoWithPoll;
