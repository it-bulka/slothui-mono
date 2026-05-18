import { Typing } from '@/entities/Typing';
import { memo } from 'react';

interface TypingInChatProps {
  typing: { userName: string } | null;
}

export const TypingInChat = memo(({ typing }: TypingInChatProps) => {
  return typing && <Typing name={typing.userName} />
})