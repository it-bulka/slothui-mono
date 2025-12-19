import { DraftMessageTextContext } from './DraftMessageTextContext.tsx';
import { type ReactNode, useCallback, useState } from 'react';
import { useAddEmojiIntoInput } from '@/features/EmojiAction/model';

export const DraftMessageTextProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState<string>('');

  const { handleEmojiClick, inputRef } = useAddEmojiIntoInput<HTMLInputElement | HTMLTextAreaElement>({
    setMsg: setText
  })

  const clearText = useCallback(() => {
    setText('');
  }, [setText]);

  return (
    <DraftMessageTextContext.Provider value={{ text, setText, handleEmojiClick, inputRef, clearText }}>
      {children}
    </DraftMessageTextContext.Provider>
  )
}