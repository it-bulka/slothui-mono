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
  GeoMessage
} from "../content";

interface Props {
  msg: MessageDto;
  isAuthor: boolean;
  isFirst?: boolean;
  time: string;
}

export const MessageComposer = ({ msg, isFirst, isAuthor, time }: Props) => {

  let content;

  if ('attachments' in msg && (msg.attachments?.images?.length || msg.attachments?.video?.length)) {
    content = <MediaMessage msg={msg} time={time} />;
  } else if ('attachments' in msg && msg.attachments?.audio?.length) {
    content = <AudioMessage msg={msg} time={time} isFirst={isFirst} isAuthor={isAuthor} />;
  } else if ('attachments' in msg && msg.attachments?.file?.length) {
    content = <FileMessage msg={msg} time={time} isFirst={isFirst} isAuthor={isAuthor} />;
  } else if ('poll' in msg && msg.poll) {
    content = <PollMessage msg={msg} time={time} isFirst={isFirst} isAuthor={isAuthor} />;
  } else if ('story' in msg && msg.story) {
    content =  <StoryMessage msg={msg} time={time} isFirst={isFirst} isAuthor={isAuthor} />;
  } else if ('event' in msg && msg.event) {
    content = <EventMessage msg={msg} time={time} />;
  } else if ('geo' in msg && msg.geo) {
    content = <GeoMessage msg={msg} time={time} />;
  } else {
    content = <TextMessage msg={msg} time={time} isFirst={isFirst} isAuthor={isAuthor} />;
  }

  return (
    <MessageBubble isAuthor={isAuthor}>
      {content}
    </MessageBubble>
  );
};
