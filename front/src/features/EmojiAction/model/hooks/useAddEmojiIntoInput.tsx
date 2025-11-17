import type { EmojiClickData } from 'emoji-picker-react';
import type { RefObject } from 'react';
interface Props {
  setMsg: (text: string) => void;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>
}
export const useAddEmojiIntoInput = ({
  inputRef,
  setMsg
}: Props) => {
  const handleEmojiClick = (msg: string) => (emojiData: EmojiClickData) => {
    if (!inputRef.current) return;

    const emoji = emojiData.emoji
    const input = inputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    const newValue = msg.slice(0, start) + emoji + msg.slice(end);
    setMsg(newValue);

    // cursor after set emoji
    const cursorPos = start + emoji.length;
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  return { handleEmojiClick }
}