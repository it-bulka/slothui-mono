import { useMemo } from 'react';
import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { AudioList } from '@/shared/ui/Attachments/ui/groups/AudioList';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';
import type { MessageComponent } from '../../../model';
import { groupAttachments } from '../../../model/helpers/groupAttachments.tsx';

export const AudioMessage = ({
  msg,
  time,
  isFirst,
  isAuthor
}: MessageComponent<MessageWithAttachmentsDto>) => {
  const { audio } = useMemo(() => groupAttachments(msg.attachments), [msg.attachments]);

  return (
    <MessageWrapper className="space-y-2" isAuthor={isAuthor} isFirst={isFirst}>
      <AudioList list={audio} limit={4}/>
      <MessageTime time={time} />
    </MessageWrapper>
  );
};