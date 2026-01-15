import { useAppSelector } from '@/shared/config/redux';
import { selectSearchedChats } from '../selectors/selectSearchedChats.ts';

export const useSearchedChatsSelect = () => {
  return useAppSelector(selectSearchedChats);
}