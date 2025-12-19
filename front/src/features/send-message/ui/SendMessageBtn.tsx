import { SendAction } from '../../SendAction/SendAction.tsx';
import { useDraftMessageExtras, useDraftMessageText } from '../../MessageComposer';
import { sendMessage, useSelectIsMessageSending } from '@/entities/Message/model';
import { useAppDispatch } from '@/shared/config/redux';
import type { Message } from '@/shared/types';
import { useActiveChatId } from '@/entities';
import { memo } from 'react';
import { toast } from 'react-toastify'

export const SendMessageBtn = memo(() => {
  const { text, clearText } = useDraftMessageText()
  const { submit: submitExtras, clearExtras } = useDraftMessageExtras()
  const dispatch = useAppDispatch();
  const activeChatId = useActiveChatId();
  const isMsgSending = useSelectIsMessageSending()

  const sendMsg = () => {
    if(!activeChatId) {
      console.error(`activeChatId null`)
      return
    }
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
  }

  return (
    <SendAction onClick={sendMsg} disabled={isMsgSending}/>
  )
})

SendMessageBtn.displayName = 'SendMessageBtn';