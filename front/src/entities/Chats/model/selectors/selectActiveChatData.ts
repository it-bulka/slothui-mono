import { selectChatById } from '../chat.adapter.ts';
import { selectActiveChatId } from './useActiveChatId.tsx';
import type { RootState } from '@/app/config';

export const selectActiveChat = (state: RootState) => {
  const activeChatId = selectActiveChatId(state);
  if (!activeChatId) return null;
  return selectChatById(state, activeChatId);
};