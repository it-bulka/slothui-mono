import { MessagesService } from '@/shared/libs/services';
import { toast } from 'react-toastify'
import { MessageToast } from '@/shared/ui';

export const initMessageListeners = (
  messagesService: MessagesService
) => {
  messagesService.onMsgNotification().subscribe(msg => {
    toast.info(<MessageToast msg={msg}/>);
  })
}