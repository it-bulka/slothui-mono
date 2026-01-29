import type { MessageDto } from '@/shared/types';
import { Message } from '@/shared/ui';
import { MessageWithAttachments, MessageWithStory, MessageWithEvent, MessageWithPoll } from '../variants';
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

  if ('poll' in msg && msg.poll) {
    return (
      <MessageWithPoll
        poll={msg.poll}
        time={time}
        isAuthor={isAuthor}
        text={msg.text}
        msgId={msg.id}
      />
    )
  }

  return (
    <Message isAuthor={isAuthor} isFirst={isFirst} time={time}>
      {msg.text}
    </Message>
  )
}