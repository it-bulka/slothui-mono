import { GroupedAttachment } from '../../attachments/types/attachments.type';
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
  attachments: GroupedAttachment;
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

export type MessageResponseDto =
  | MessageBaseResponseDto
  | MessageWithAttachmentsResponseDto
  | MessageWithPollResponseDto
  | MessageWithGeoResponseDto
  | MessageWithPostResponseDto;

export type MessageWithOptionals = Message & {
  attachments?: GroupedAttachment;
  poll?: PollResultDto;
  geo?: GeoDtoResponse;
  post?: PostSummaryDto;
};
