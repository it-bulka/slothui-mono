import type { MessageWithStoryDto } from '@/shared/types/message.dto.ts';
import { Message, type MessageProps } from '@/shared/ui/Message/Message.tsx';
import { StoryMessagePreview } from './StoryMessagePreview.tsx';
import { SharedInfo } from '../base/SharedInfo.tsx';

type MessageWithStoryProps = Pick<MessageWithStoryDto, 'text' | 'story'> & MessageProps
export const MessageWithStory = ({
  story,
  text,
  time,
  isFirst,
  isAuthor,
}: MessageWithStoryProps) => {
  return (
    <Message isAuthor={isAuthor} isFirst={isFirst} time={time}>
      <SharedInfo />
      <StoryMessagePreview {...story} />
      {text}
    </Message>
  )
}