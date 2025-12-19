import type { EmojiClickData } from 'emoji-picker-react';
import { useRef } from 'react';
interface Props {
  setMsg: (text: string) => void;
  //inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>
}
export const useAddEmojiIntoInput = <T extends HTMLInputElement | HTMLTextAreaElement,>({
  setMsg
}: Props) => {
  const inputRef = useRef<T>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (!inputRef.current) return;

    const emoji = emojiData.emoji
    const input = inputRef.current;
    const start = input.selectionStart || input.value.length || 0;
    const end = input.selectionEnd || input.value.length || 0;

    const newValue = input.value.slice(0, start) + emoji + input.value.slice(end);

    setMsg(newValue);

    // cursor after set emoji
    const cursorPos = start + emoji.length;
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(cursorPos, cursorPos);
    })
  };

  return { handleEmojiClick, inputRef }
}