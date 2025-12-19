import type { GroupedAttachment } from './attachments.types.ts'
import type { Geo } from './geo.types.ts'
import type { Poll } from './poll.types.ts'

export type MessageBase = {
  chatId: string;
  text: string;
};

export  type MsgWithAttachments = MessageBase & { attachments: GroupedAttachment }
export  type MsgWithGeo = MessageBase & { geo: Geo }
export  type MsgWithPoll = MessageBase & { poll: Poll }
export  type MsgWithStory = MessageBase & { storyId: string }

export type Message = MessageBase
  | MsgWithAttachments
  | MsgWithStory
  | MsgWithGeo
  | MsgWithPoll

// to send
export type MessageBaseToSend = {
  text: string;
};

export  type MsgWithAttachmentsToSend = MessageBaseToSend & { attachments: GroupedAttachment }
export  type MsgWithStoryToSend = MessageBaseToSend & { storyId: string }
export  type MsgWithGeoToSend = MessageBaseToSend & { geo: string }
export  type MsgWithPollToSend = MessageBaseToSend & { poll: string }

export type MessageToSend = MessageBaseToSend
  | MsgWithAttachmentsToSend
  | MsgWithStoryToSend
  | MsgWithGeoToSend
  | MsgWithPollToSend

// NOTIFICATION

export type MessageNotification = {
  id: string;
  chatId: string;
  text: string;
  from: {
    id: string;
    avatarUrl: string;
    author: string;
  };
  isAttachment: boolean;
}
