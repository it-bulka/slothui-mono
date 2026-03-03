import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { DocumentsList } from '@/shared/ui';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';

interface FileMessageProps {
  msg: MessageWithAttachmentsDto
  time: string
  isAuthor: boolean;
  isFirst?: boolean;
}

export const FileMessage = ({ msg, time, isAuthor, isFirst }: FileMessageProps) => {
  return (
    <MessageWrapper className="space-y-2" isAuthor={isAuthor} isFirst={isFirst}>
      <DocumentsList list={msg.attachments.file} limit={4}/>
      <MessageTime time={time} />
    </MessageWrapper>
  );
};