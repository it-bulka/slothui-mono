import { EmojiAction } from '@/features/EmojiAction';
import { useDraftMessageText } from '@/features/DraftMessage';

export const MessageEmojiAction = () => {
  const { handleEmojiClick } = useDraftMessageText()
  return (
    <EmojiAction onEmojiClick={handleEmojiClick} />
  )
}