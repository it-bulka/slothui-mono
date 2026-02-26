import type { Message } from '@/shared/types';
import { sendMessage } from '@/entities/Message/model';
import { useDraftMessageExtras, useDraftMessageText } from '@/features/MessageComposer';
import { useAppDispatch } from '@/shared/config/redux';
import { useActiveChatId } from '@/entities';
import { useCallback } from 'react';
import { toast } from 'react-toastify'

export const useSendMessage = () => {
  const { text, clearText } = useDraftMessageText()
  const { submit: submitExtras, clearExtras } = useDraftMessageExtras()
  const dispatch = useAppDispatch();
  const activeChatId = useActiveChatId();
  
  const sendMsg = useCallback(() => {
    if(!activeChatId) return

    const extras = submitExtras()
    const msg: Message = {
      text: text,
      chatId: activeChatId,
      ...(extras || {})
    }

    dispatch(sendMessage(msg))
      .unwrap()
      .then(() => {
        clearExtras();
        clearText()
      })
      .catch((err: Error) => {
        toast.error(err.message || 'Send message failed.')
      });
  }, [activeChatId, clearExtras, clearText, dispatch, submitExtras, text])

  return { sendMsg }
}