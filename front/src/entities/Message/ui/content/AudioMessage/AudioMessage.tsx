import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { AudioList } from '@/shared/ui';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';
import type { MessageComponent } from '../../../model';

export const AudioMessage = ({
  msg,
  time,
  isFirst,
  isAuthor
}: MessageComponent<MessageWithAttachmentsDto>) => {
  return (
    <MessageWrapper className="space-y-2" isAuthor={isAuthor} isFirst={isFirst}>
      <AudioList list={msg.attachments.audio} limit={4}/>
      <MessageTime time={time} />
    </MessageWrapper>
  );
};