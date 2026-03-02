import type { MessageBaseDto } from '@/shared/types/message.dto.ts';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';

interface TextMessageProps {
  msg: MessageBaseDto
  time: string
  isAuthor: boolean;
  isFirst?: boolean;
}
export const TextMessage = ({ msg, time, ...rest }: TextMessageProps) => {
  return (
    <MessageWrapper {...rest}>
      <p className="break-words">{msg.text}</p>
      <MessageTime time={time} className={"mt-1"}/>
    </MessageWrapper>
  );
};