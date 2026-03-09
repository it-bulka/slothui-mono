import type { ComponentType } from 'react';

import type {
  MessageWithAttachmentsDto,
  MessageWithEventDto,
  MessageWithGeoDto,
  MessageWithPollDto, MessageWithStoryDto, MessageBaseDto,
  MessageDto
} from '@/shared/types/message.dto.ts';

export type MessageMap = {
  text: MessageBaseDto;
  media: MessageWithAttachmentsDto;
  audio: MessageWithAttachmentsDto;
  file: MessageWithAttachmentsDto;
  poll: MessageWithPollDto;
  geo: MessageWithGeoDto;
  event: MessageWithEventDto;
  story: MessageWithStoryDto;
}

export type MessageComponent<T extends MessageDto = MessageDto> = {
  msg: T;
  time: string;
  isFirst?: boolean;
  isAuthor: boolean;
};

export type MessageRegistry = {
  [K in keyof MessageMap]: {
    component: ComponentType<MessageComponent<MessageMap[K]>>;
    fullWidth: boolean;
  };
};