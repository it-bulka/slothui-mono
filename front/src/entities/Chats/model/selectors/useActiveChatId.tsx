import { useAppSelector } from '@/shared/config/redux';

export const useActiveChatId = () => useAppSelector(state => {
  return state.chats.activeChatId;
})