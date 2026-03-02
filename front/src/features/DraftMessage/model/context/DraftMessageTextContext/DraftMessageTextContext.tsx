import { createContext, type RefObject } from 'react';
import type { EmojiClickData } from 'emoji-picker-react';

interface DraftMessageTextContextProps {
  text: string;
  setText: (text: string) => void;
  clearText: () => void;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>
  handleEmojiClick: (emojiData: EmojiClickData) => void
}
export const DraftMessageTextContext = createContext<DraftMessageTextContextProps | undefined>(undefined)