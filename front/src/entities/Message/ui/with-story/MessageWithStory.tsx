import type { MessageWithStoryDto } from '@/entities/Message/model/type/message.dto.ts';
import { Message, type MessageProps } from '@/shared/ui/Message/Message.tsx';
import { StoryMessagePreview } from './StoryMessagePreview.tsx';

export const MessageWithStory = ({
  story,
  text,
  time,
  isFirst,
  isAuthor,
}: MessageWithStoryDto & MessageProps) => {
  return (
    <Message isAuthor={isAuthor} isFirst={isFirst} time={time}>
      <StoryMessagePreview {...story} />
      {text}
    </Message>
  )
}