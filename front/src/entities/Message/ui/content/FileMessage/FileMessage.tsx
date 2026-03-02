import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { DocumentsList } from '@/shared/ui';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';

export const FileMessage = ({ msg, time }: { msg: MessageWithAttachmentsDto, time: string }) => {
  return (
    <div className="space-y-2">
      <DocumentsList list={msg.attachments.file} limit={4}/>
      <MessageTime time={time} />
    </div>
  );
};