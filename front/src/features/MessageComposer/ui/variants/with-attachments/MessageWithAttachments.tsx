import { MessageAttachments } from './MessageAttachments.tsx';
import type { MessageWithAttachmentsDto } from '../../../../../shared/types/message.dto.ts';
import { Message } from '@/shared/ui';
import type { MessageProps } from '@/shared/ui/Message/Message.tsx';

type IMessageWithAttachments = Pick<MessageWithAttachmentsDto, 'text' | 'attachments'> & MessageProps

export const MessageWithAttachments = ({
  attachments, isFirst, time, isAuthor, text
}: IMessageWithAttachments) => {
  return (
    <Message isAuthor={isAuthor} time={time} isFirst={isFirst}>
      <MessageAttachments attachments={attachments} />
      {text}
    </Message>
  )
}