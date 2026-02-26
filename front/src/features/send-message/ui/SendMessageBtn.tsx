import { SendAction } from '../../SendAction/SendAction.tsx';
import { useSelectIsMessageSending } from '@/entities/Message/model';
import { memo } from 'react';
import { useSendMessage } from '../model';

export const SendMessageBtn = memo(() => {
  const isMsgSending = useSelectIsMessageSending()
  const { sendMsg } = useSendMessage()

  return (
    <SendAction onClick={sendMsg} disabled={isMsgSending}/>
  )
})

SendMessageBtn.displayName = 'SendMessageBtn';