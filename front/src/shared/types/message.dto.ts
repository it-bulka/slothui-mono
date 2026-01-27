import type { GroupedAttachment } from './attachments.types.ts';
import type { PollDto } from './poll.dto.ts';
import type { StoryDTO } from '../libs/services';

export type MessageBaseDto = {
  id: string;
  chatId: string;
  text: string;
  authorId: string;
  createdAt: string; // ISOString
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

export type MessageWithEventDto = MessageBaseDto & {
  event: {
    description: string;
    title: string;
    location?: string;
    date?: string;
    id: string
  };
};

export type MessageDto =
  | MessageBaseDto
  | MessageWithAttachmentsDto
  | MessageWithPollDto
  | MessageWithStoryDto
  | MessageWithEventDto;
