import type { MessageDto } from '@/shared/types';
import { Message } from '@/shared/ui';
import { MessageWithAttachments, MessageWithStory, MessageWithEvent } from '@/entities/Message';
import type { MessageProps } from '@/shared/ui/Message/Message.tsx';

export const MessageComposer = ({ msg, isFirst, time, isAuthor }: { msg: MessageDto} & MessageProps) => {
  if ('attachments' in msg && msg.attachments) {
    return (
      <MessageWithAttachments
        isAuthor={isAuthor}
        time={time}
        isFirst={isFirst}
        attachments={msg.attachments}
        text={msg.text}
      />
    )
  }

  if('story' in msg && msg.story) {
    return (
      <MessageWithStory
        text={msg.text}
        story={msg.story}
        time={time}
        isAuthor={isAuthor}
      />
    )
  }

  if ('event' in msg && msg.event) {
    return (
      <MessageWithEvent
        event={msg.event}
        time={time}
        isAuthor={isAuthor}
      />
    )
  }

  return (
    <Message isAuthor={isAuthor} isFirst={isFirst} time={time}>
      {msg.text}
    </Message>
  )
}