import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MediaStack } from './MediaStack';

interface MediaMessageProps {
  msg: MessageWithAttachmentsDto;
  time: string;
}

export const MediaMessage = ({ msg, time }: MediaMessageProps) => {
  const media = [
    ...(msg.attachments?.images || []),
    ...(msg.attachments?.video || [])
  ];

  return (
    <div className="relative inline-block max-w-[260px]">
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