import type { RootState } from '@/app/config';
import { useAppSelector } from '@/shared/config/redux';

export const selectMessagesByChatId = (chatId: string | null) => (state: RootState) => {
  if (!chatId) return []

  const ids = state.messages.idsByChat[chatId] || [];
  return ids.map((id: string) => state.messages.entities[id]);
};

export const useSelectMessagesByChatId = (chatId: string | null) => useAppSelector(selectMessagesByChatId(chatId))