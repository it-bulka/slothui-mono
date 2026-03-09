import type { MessageBaseDto } from '@/shared/types/message.dto.ts';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';
import type { MessageComponent } from '../../../model';

export const TextMessage = ({ msg, time, ...rest }: MessageComponent<MessageBaseDto>) => {
  return (
    <MessageWrapper {...rest}>
      <p className="break-words">{msg.text}</p>
      <MessageTime time={time} className={"mt-1"}/>
    </MessageWrapper>
  );
};