import type { MessageDto } from "@/shared/types";
import { MessageBubble } from "../MessageBubble/MessageBubble.tsx";
import {
  TextMessage,
  MediaMessage,
  AudioMessage,
  FileMessage,
  PollMessage,
  StoryMessage,
  EventMessage,
  GeoMessage,
  PostMessage
} from "../content";

import { getMessageType } from '../../model';
import type { MessageRegistry, MessageComponent } from '../../model';


const messageConfig: MessageRegistry  = {
  media: { component: MediaMessage, fullWidth: false },
  audio: { component: AudioMessage, fullWidth: false },
  file: { component: FileMessage, fullWidth: false },
  poll: { component: PollMessage, fullWidth: true },
  geo: { component: GeoMessage, fullWidth: true },
  event: { component: EventMessage, fullWidth: true },
  story: { component: StoryMessage, fullWidth: false },
  post: { component: PostMessage, fullWidth: true },
  text: { component: TextMessage, fullWidth: false }
}

export const MessageComposer = ({
  msg, isFirst, isAuthor, time
}: MessageComponent<MessageDto>) => {
  const type = getMessageType(msg);
  const { component: Component, fullWidth } = messageConfig[type];

  return (
    <MessageBubble isAuthor={isAuthor} maxWidth={fullWidth}>
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        msg={msg as any}
        time={time}
        isFirst={isFirst}
        isAuthor={isAuthor}
      />
    </MessageBubble>
  );
};
