import { MessageAttachments } from './MessageAttachments.tsx';
import type { MessageWithAttachmentsDto } from '../../model/type/message.dto.ts';
import { Message } from '@/shared/ui';
import type { MessageProps } from '@/shared/ui/Message/Message.tsx';
import type { PropsWithChildren } from 'react';

type IMessageWithAttachments = MessageWithAttachmentsDto & MessageProps

export const MessageWithAttachments = ({
  attachments, isFirst, time, isAuthor, children
}: PropsWithChildren<IMessageWithAttachments>) => {
  return (
    <Message isAuthor={isAuthor} time={time} isFirst={isFirst}>
      <MessageAttachments attachments={attachments} />
      {children}
    </Message>
  )
}