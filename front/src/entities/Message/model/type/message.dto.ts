import type { GroupedAttachment } from '../../../../shared/ui/Attachments/model/type/attachment.dto.ts';
import type { PollDto } from './poll.dto.ts';
import type { StoryDTO } from '@/shared/libs/services';

export type MessageBaseDto = {
  id: string;
  chatId: string;
  text: string;
  authorId: string;
};

export type MessageWithAttachmentsDto = MessageBaseDto & {
  attachments: GroupedAttachment;
};

export type MessageWithPollDto = MessageBaseDto & {
  poll: PollDto;
};

export type MessageWithStoryDto = MessageBaseDto & {
  story: StoryDTO;
};

export type MessageDto =
  | MessageBaseDto
  | MessageWithAttachmentsDto
  | MessageWithPollDto
  | MessageWithStoryDto;
