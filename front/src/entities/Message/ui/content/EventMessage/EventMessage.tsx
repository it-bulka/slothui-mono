import { Typography } from '@/shared/ui';
import { SharedInfo } from '../../SharedInfo/SharedInfo.tsx';
import { MsgEventPreview } from './MsgEventPreview.tsx';
import type { MessageWithEventDto } from '@/shared/types/message.dto.ts';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';

export const EventMessage = ({ msg, time }: { msg: MessageWithEventDto, time: string }) => {
  if (!msg.event) {
    return (
      <>
        <SharedInfo />
        <Typography className="border-gray-g1 border-l ml-1.5">Event is deleted or deprecated</Typography>
        <MessageTime time={time} />
      </>
    );
  }
  return (
    <>
      <SharedInfo />
      <MsgEventPreview
        id={msg.event.id}
        title={msg.event.title}
        location={msg.event.location}
        date={msg.event.date}
        description={msg.event.description}
      />
      <MessageTime time={time} />
    </>
  )
}