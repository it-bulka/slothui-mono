import { useMemo } from 'react';
import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MediaStack } from './MediaStack';
import type { MessageComponent } from '../../../model';
import { groupAttachments } from '../../../model/helpers/groupAttachments.tsx';

export const MediaMessage = ({ msg, time }: MessageComponent<MessageWithAttachmentsDto>) => {
  const media = useMemo(() => {
    const grouped = groupAttachments(msg.attachments);
    return [...grouped.images, ...grouped.video];
  }, [msg.attachments]);

  return (
    <div className="relative inline-block" >
      <MediaStack media={media} />

      <MessageTime time={time} position="absolute" variant="onMedia" />

      {msg.text && (
        <div className="mt-2 bg-gray-g3 rounded-2xl px-3 py-2">
          {msg.text}
        </div>
      )}
    </div>
  );
};