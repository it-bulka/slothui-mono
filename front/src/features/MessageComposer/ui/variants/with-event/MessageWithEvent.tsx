import { Message, Typography } from '@/shared/ui';
import { MsgEventPreview } from './MsgEventPreview.tsx';
import type { MessageProps } from '@/shared/ui/Message/Message.tsx';
import type { MsgEventPreviewProps } from './MsgEventPreview.tsx';
import { SharedInfo } from '@/features/MessageComposer/ui/variants/base/SharedInfo.tsx';

type MessageWithEventProps = MessageProps & {
  event?: MsgEventPreviewProps
}
export const MessageWithEvent = ({
  isAuthor,
  isFirst,
  time,
  event
}: MessageWithEventProps) => {
  if (!event) {
    return (
      <Message isAuthor={isAuthor} isFirst={isFirst} time={time}>
        <SharedInfo />
        <Typography className="border-gray-g1 border-l ml-1.5">Event is deleted or deprecated</Typography>
      </Message>
    );
  }
  return (
    <Message isAuthor={isAuthor} isFirst={isFirst} time={time}>
      <SharedInfo />
      <MsgEventPreview
        id={event.id}
        title={event.title}
        location={event.location}
        date={event.date}
        description={event.description}
      />
    </Message>
  )
}