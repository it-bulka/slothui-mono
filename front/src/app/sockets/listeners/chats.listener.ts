import type { IServices } from '@/shared/libs/services/context/service.context.tsx';
import type { AppStore } from '../../config';
import { chatsActions } from '@/entities';

export const initChatsListeners = (services: IServices, store: AppStore) => {
  services.chat.onChatCreated().subscribe((chat) => {
    store.dispatch(chatsActions.addChat(chat));
  });

  services.chat.onChatDeleted().subscribe(({ chatId }) => {
    store.dispatch(chatsActions.removeChat(chatId));
  });
};
