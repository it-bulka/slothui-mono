import type { GroupedAttachment } from './attachments.types.ts';
import type { PollDto, PollResultDto } from './poll.dto.ts';
import type { StoryDTO } from '../libs/services';
import type { UserShort } from './user.types.ts';
import type { Geo } from '@/shared/types/geo.types.ts';

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
  poll: PollDto | PollResultDto;
};

export type MessageWithStoryDto = MessageBaseDto & {
  story: StoryDTO & { user: UserShort };
};

export type MessageWithGeoDto = MessageBaseDto & {
  geo: Geo;
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

export type MessageWithPostDto = MessageBaseDto & {
  post: PostSummaryDto;
};

export type MessageDto =
  | MessageBaseDto
  | MessageWithAttachmentsDto
  | MessageWithPollDto
  | MessageWithStoryDto
  | MessageWithGeoDto
  | MessageWithEventDto
  | MessageWithPostDto;
