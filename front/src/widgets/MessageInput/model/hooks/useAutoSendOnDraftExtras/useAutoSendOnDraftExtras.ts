import { useEffect, useRef } from 'react';
import { useDraftMessageExtras } from '@/features/DraftMessage';
import { useSendMessage } from '@/features/send-message/model';

export const useAutoSendOnDraftExtras = () => {
  const { hasDraftExtras } = useDraftMessageExtras()
  const { sendMsg } = useSendMessage()

  // Stable ref avoids re-triggering when sendMsg identity changes
  const sendMsgRef = useRef(sendMsg)
  useEffect(() => { sendMsgRef.current = sendMsg }, [sendMsg])

  useEffect(() => {
    if (!hasDraftExtras) return
    sendMsgRef.current()
  }, [hasDraftExtras])
}
