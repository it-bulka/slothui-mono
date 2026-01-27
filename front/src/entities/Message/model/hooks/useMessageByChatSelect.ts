import { useAppSelector } from '@/shared/config/redux';
import { selectMessagesByChatId } from '@/entities/Message/model/selectors/selectMessagesByChatId.tsx';

export const useMessagesByChatSelect = (chatId?: string | null) =>
  useAppSelector(state => selectMessagesByChatId(state, chatId));