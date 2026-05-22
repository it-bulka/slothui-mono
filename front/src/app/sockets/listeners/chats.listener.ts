import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '../../config';
import { chatsActions, selectActiveChatId } from '@/entities/Chats';
import { notificationsCountersActions } from '@/entities/NotificationsCounters';

export const initChatsListeners = (services: ServicesFacade, store: AppStore) => {
  services.chat.onChatCreated().subscribe((chat) => {
    store.dispatch(chatsActions.addChat(chat));
  });

  services.chat.onChatDeleted().subscribe(({ chatId }) => {
    store.dispatch(chatsActions.removeChat(chatId));
  });

  services.chat.onUnreadMessageByChat().subscribe((d) => {
    const activeChatId = selectActiveChatId(store.getState());
    const updates = d.updates.filter((u) => u.chatId !== activeChatId);
    const totalDelta = updates.reduce((sum, u) => sum + u.unreadDelta, 0);

    store.dispatch(chatsActions.updateManyLastMessages(d.updates));
    store.dispatch(notificationsCountersActions.unreadBatchReceived({ updates, totalDelta }));
  });

  services.chat.onUnreadSync().subscribe(({ chatId }) => {
    store.dispatch(notificationsCountersActions.resetChatUnread({ chatId }));
  });
};
