import type { MessageWithPollDto } from "@/shared/types";
import { getPollMode } from '../../../../Poll';
import { type MessageComponent, useUpdatePollInMessage } from '../../../model';
import { PollView } from '@/features/PollView';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';
import { Typography } from '@/shared/ui';

export const PollMessage = ({
  msg, time, isAuthor, isFirst
}: MessageComponent<MessageWithPollDto>) => {
  const mode = getPollMode(msg.poll)
  const { updatePollInMessage } = useUpdatePollInMessage(msg.id)
  return (
    <MessageWrapper className="space-y-2" isAuthor={isAuthor} isFirst={isFirst}>
      {msg.text && <Typography>{msg.text}</Typography>}

      <PollView poll={msg.poll} mode={mode} onEditPollSubmit={updatePollInMessage}/>
      <MessageTime time={time} />
    </MessageWrapper>
  )
};