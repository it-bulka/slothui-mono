import { EmojiAction } from '@/features';
import { useDraftMessageText } from '@/features/DraftMessage';

export const MessageEmojiAction = () => {
  const { handleEmojiClick } = useDraftMessageText()
  return (
    <EmojiAction onEmojiClick={handleEmojiClick} />
  )
}