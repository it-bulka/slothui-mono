import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { AudioList } from '@/shared/ui';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';

interface AudioMessageProps {
  msg: MessageWithAttachmentsDto
  time: string
  isAuthor: boolean;
  isFirst?: boolean;
}

export const AudioMessage = ({ msg, time, isFirst, isAuthor }: AudioMessageProps) => {
  return (
    <MessageWrapper className="space-y-2" isAuthor={isAuthor} isFirst={isFirst}>
      <AudioList list={msg.attachments.audio} limit={4}/>
      <MessageTime time={time} />
    </MessageWrapper>
  );
};