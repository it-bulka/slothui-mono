import { AttachmentDto } from '../../attachments/dto/attachment.dto';
import { PollResultDto } from '../../polls/dto/poll.dto';
import { Message } from '../entities/message.entity';
import { GeoDtoResponse } from '../../geo-message/dto/geo.dto';

export type MessageBaseResponseDto = {
  id: string;
  chatId: string;
  text: string;
  authorId: string;
  createdAt: string; // ISO
};

export type MessageWithAttachmentsResponseDto = MessageBaseResponseDto & {
  attachments: AttachmentDto[];
};

export type MessageWithPollResponseDto = MessageBaseResponseDto & {
  poll: PollResultDto;
};

export type MessageWithGeoResponseDto = MessageBaseResponseDto & {
  geo: GeoDtoResponse;
};

export type PostSummaryDto = {
  id: string;
  text?: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  coverUrl?: string;
  mediaCount: number;
  fileCount: number;
  audioCount: number;
  pollQuestion?: string;
};

export type MessageWithPostResponseDto = MessageBaseResponseDto & {
  post: PostSummaryDto;
};

export type StoryInMessageDto = {
  id: string;
  url: string;
  type: 'image' | 'video';
  duration?: number;
  createdAt: string;
  userId: string;
  user?: {
    id: string;
    username: string;
    nickname: string;
    avatarUrl?: string | null;
  };
};

export type MessageWithStoryResponseDto = MessageBaseResponseDto & {
  story: StoryInMessageDto;
};

export type MessageResponseDto =
  | MessageBaseResponseDto
  | MessageWithAttachmentsResponseDto
  | MessageWithPollResponseDto
  | MessageWithGeoResponseDto
  | MessageWithPostResponseDto
  | MessageWithStoryResponseDto;

export type MessageWithOptionals = Message & {
  attachments?: AttachmentDto[];
  poll?: PollResultDto;
  geo?: GeoDtoResponse;
  post?: PostSummaryDto;
};
