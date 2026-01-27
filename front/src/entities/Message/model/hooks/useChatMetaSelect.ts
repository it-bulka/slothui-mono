import { useAppSelector } from '@/shared/config/redux';
import { selectChatMeta } from '../selectors/selectChatMeta.ts';

export const useChatMetaSelect = (chatId?: string | null) => {
  return useAppSelector(state => selectChatMeta(state, chatId));
}