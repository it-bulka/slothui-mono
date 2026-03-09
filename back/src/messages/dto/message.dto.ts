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

export type MessageResponseDto =
  | MessageBaseResponseDto
  | MessageWithAttachmentsResponseDto
  | MessageWithPollResponseDto
  | MessageWithGeoResponseDto;

export type MessageWithOptionals = Message & {
  attachments?: GroupedAttachment;
  poll?: PollResultDto;
  geo?: GeoDtoResponse;
};
