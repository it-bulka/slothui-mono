import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '../../config';
import { chatsActions } from '@/entities/Chats';
import { notificationsCountersActions } from '@/entities/NotificationsCounters';

export const initChatsListeners = (services: ServicesFacade, store: AppStore) => {
  services.chat.onChatCreated().subscribe((chat) => {
    store.dispatch(chatsActions.addChat(chat));
  });

  services.chat.onChatDeleted().subscribe(({ chatId }) => {
    store.dispatch(chatsActions.removeChat(chatId));
  });

  services.chat.onUnreadMessageByChat().subscribe((d) => {
    store.dispatch(chatsActions.updateManyLastMessages(d.updates));
    store.dispatch(notificationsCountersActions.unreadBatchReceived(d));
  })
};
