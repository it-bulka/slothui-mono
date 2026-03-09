import { SharedInfo } from '../../SharedInfo/SharedInfo.tsx';
import { StoryMessagePreview } from './StoryMessagePreview.tsx';
import type { MessageWithStoryDto } from '@/shared/types/message.dto.ts';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';
import type { MessageComponent } from '../../../model';

export const StoryMessage = ({
  msg, time, isAuthor, isFirst
}: MessageComponent<MessageWithStoryDto>) => {
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