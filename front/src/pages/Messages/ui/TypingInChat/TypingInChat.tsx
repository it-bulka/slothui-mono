import { Typing } from '@/entities';
import { useCurrentChat } from '@/pages/Messages/model';
import { memo } from 'react';

export const TypingInChat = memo(() => {
  const { typing } = useCurrentChat()
  return typing && <Typing name={typing.userName} />
})