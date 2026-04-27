import { useMemo } from 'react';
import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { DocumentsList } from '@/shared/ui';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';
import type { MessageComponent } from '@/entities/Message/model';
import { groupAttachments } from '../../../model/helpers/groupAttachments.tsx';

export const FileMessage = ({
  msg, time, isAuthor, isFirst
}: MessageComponent<MessageWithAttachmentsDto>) => {
  const { file } = useMemo(() => groupAttachments(msg.attachments), [msg.attachments]);

  return (
    <MessageWrapper className="space-y-2" isAuthor={isAuthor} isFirst={isFirst}>
      <DocumentsList list={file} limit={4}/>
      <MessageTime time={time} />
    </MessageWrapper>
  );
};