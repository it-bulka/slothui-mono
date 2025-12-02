import { GroupedAttachment } from '../../attachments/types/attachments.type';
import { PollDto } from '../../polls/dto/poll.dto';

export type MessageBaseResponseDto = {
  id: string;
  chatId: string;
  text: string;
  authorId: string;
};

export type MessageWithAttachmentsResponseDto = MessageBaseResponseDto & {
  attachments: GroupedAttachment;
};

export type MessageWithPollResponseDto = MessageBaseResponseDto & {
  poll: PollDto;
};

export type MessageResponseDto =
  | MessageBaseResponseDto
  | MessageWithAttachmentsResponseDto
  | MessageWithPollResponseDto;

export type MessageWithOptionals = MessageBaseResponseDto & {
  attachments?: GroupedAttachment;
  poll?: PollDto;
};
