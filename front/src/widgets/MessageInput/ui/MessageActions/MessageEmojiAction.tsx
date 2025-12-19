import { EmojiAction } from '@/features';
import { useDraftMessageText } from '@/features/MessageComposer';

export const MessageEmojiAction = () => {
  const { handleEmojiClick } = useDraftMessageText()
  return (
    <EmojiAction onEmojiClick={handleEmojiClick} />
  )
}