import type { MessageWithPollDto } from "@/shared/types";
import { getPollMode } from '../../../../Poll';
import { useUpdatePollInMessage } from '../../../model';
import { PollView } from '@/features/PollView';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';

interface PollMessageProps {
  msg: MessageWithPollDto,
  time: string
  isAuthor: boolean;
  isFirst?: boolean;
}

export const PollMessage = ({ msg, time, isAuthor, isFirst }: PollMessageProps) => {
  const mode = getPollMode(msg.poll)
  const { updatePollInMessage } = useUpdatePollInMessage(msg.id)
  return (
    <>
      {msg.text && (
        <MessageWrapper isAuthor={isAuthor} isFirst={isFirst} as="p">
          {msg.text}
        </MessageWrapper>
      )}

      <PollView poll={msg.poll} mode={mode} onEditPollSubmit={updatePollInMessage}/>
      <MessageTime time={time} />
    </>
  )
};