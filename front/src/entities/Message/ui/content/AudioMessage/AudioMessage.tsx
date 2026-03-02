import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { AudioList } from '@/shared/ui';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';

export const AudioMessage = ({ msg, time }: { msg: MessageWithAttachmentsDto, time: string }) => {
  return (
    <div>
      <AudioList list={msg.attachments.audio} limit={4}/>
      <MessageTime time={time} />
    </div>
  );
};