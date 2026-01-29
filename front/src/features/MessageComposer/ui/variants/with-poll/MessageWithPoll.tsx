import { Message } from '@/shared/ui';
import type { MessageWithPollDto } from '@/shared/types/message.dto.ts';
import type { MessageProps } from '@/shared/ui/Message/Message.tsx';
import { PollView } from '../../../../PollView';
import { getPollMode } from '../../../../PollView/model';
import { useUpdatePollInMessage } from '@/entities/Message';

type MessageWithPollProps = Pick<MessageWithPollDto, 'text' | 'poll'> & MessageProps & { msgId: string}
export const MessageWithPoll = ({
  isAuthor,
  isFirst,
  time,
  text,
  poll,
  msgId
}: MessageWithPollProps) => {
  const mode = getPollMode(poll)
  const { updatePollInMessage } = useUpdatePollInMessage(msgId)
  return (
    <Message isAuthor={isAuthor} isFirst={isFirst} time={time}>
      {text}
      <PollView poll={poll} mode={mode} onEditPollSubmit={updatePollInMessage}/>
    </Message>
  )
}