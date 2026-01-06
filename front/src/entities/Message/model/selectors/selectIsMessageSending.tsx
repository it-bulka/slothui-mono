import type { RootState } from '@/app/config';
import { useAppSelector } from '@/shared/config/redux';

export const selectIsMessageSending = (state: RootState) => {
  const chatId = state.chats.activeChatId
  if(!chatId) return false

  return state.messages.sendingByChat[chatId];
};

export const useSelectIsMessageSending = () => useAppSelector(selectIsMessageSending)