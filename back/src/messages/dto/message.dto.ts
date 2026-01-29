import { GroupedAttachment } from '../../attachments/types/attachments.type';
import { PollResultDto } from '../../polls/dto/poll.dto';
import { Message } from '../entities/message.entity';

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

export type MessageResponseDto =
  | MessageBaseResponseDto
  | MessageWithAttachmentsResponseDto
  | MessageWithPollResponseDto;

export type MessageWithOptionals = Message & {
  attachments?: GroupedAttachment;
  poll?: PollResultDto;
};
