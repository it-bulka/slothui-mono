import { SharedInfo } from '@/entities/Message/ui/SharedInfo/SharedInfo.tsx';
import { StoryMessagePreview } from './StoryMessagePreview.tsx';
import type { MessageWithStoryDto } from '@/shared/types/message.dto.ts';
import { MessageTime } from '@/entities/Message/ui/MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';

interface StoryMessageProps {
  msg: MessageWithStoryDto,
  time: string
  isAuthor: boolean;
  isFirst?: boolean;
}

export const StoryMessage = ({ msg, time, isAuthor, isFirst }: StoryMessageProps) => {
  return (
    <>
      <SharedInfo />
      <StoryMessagePreview {...msg.story} />
      {msg.text && (
        <MessageWrapper isAuthor={isAuthor} isFirst={isFirst} as="p">
          {msg.text}
        </MessageWrapper>
      )}
      <MessageTime time={time} />
    </>
  )
}