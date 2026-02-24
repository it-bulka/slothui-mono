import type { IServices } from '@/shared/libs/services/context/service.context.tsx';
import type { AppStore } from '../../config';
import { selectActiveChatId, messagesAction, chatsActions, notificationsCountersActions } from '@/entities';
import { toast } from 'react-toastify'
import { MessageToast } from '@/shared/ui';
import { msgToNotification } from '@/shared/mappers';
import type { MessageDto } from '@/shared/types';

export const initMessageBatcher = (services: IServices, store: AppStore) => {
  services.messages.onNewMessage()
    .subscribe((m) => {
      const chatId = m.chatId;
      const activeChat = selectActiveChatId(store.getState());

      if (chatId === activeChat) {
        handleActiveChatMessage(store, chatId, m);
      } else {
        handleInactiveChatMessage(services, store, chatId, m)
          .catch(err => console.error(err));
      }
    });
};


function handleActiveChatMessage (store: AppStore, chatId: string, message: MessageDto) {
  store.dispatch(messagesAction.addMessage({ chatId, message }));
};

async function handleInactiveChatMessage (
  services: IServices,
  store: AppStore,
  chatId: string,
  message: MessageDto
) {
  const lastMsg = message;
  if (!lastMsg) return;
  try {
    const author = await services.authors.fetchIfMissing(lastMsg.authorId);
    const notification = msgToNotification(lastMsg);
    toast.info(<MessageToast author={author} msg={notification} />, {
      icon: false,
      autoClose: 5000
    });

    const chatLastMsg = { id: lastMsg.id, text: lastMsg.text, createdAt: lastMsg.createdAt };
    store.dispatch(notificationsCountersActions.incrementUnreadMessage({ chatId, count: 1 }));
    store.dispatch(chatsActions.updateLastMessage({ chatId, msg: chatLastMsg }));
  } catch (error) {
    console.error((error as Error).message || 'Failed to show message notification.');
  }
};