import { useAppSelector } from '@/shared/config/redux';
import type { RootState } from '@/app/config';

export const selectActiveChatId = (state: RootState) => state.chats.activeChatId;
export const useActiveChatId = () => useAppSelector(selectActiveChatId)