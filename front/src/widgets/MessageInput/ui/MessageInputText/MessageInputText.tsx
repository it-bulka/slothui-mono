import { Textarea } from '@/shared/ui';
import { useDraftMessageText } from '@/features/DraftMessage';
import { useSendMessage } from '@/features/send-message/model';
import { type RefObject, memo, useCallback } from 'react';
import { useMessagesService } from '@/shared/libs/services';
import { useActiveChatId, useSelectIsMessageSending } from '@/entities';

interface MessageInputTextProps {
  className?: string
}
export const MessageInputText = memo(({
  className,
}: MessageInputTextProps) => {
  const { inputRef, text, setText } = useDraftMessageText()
  const msgService = useMessagesService()
  const isMsgSending = useSelectIsMessageSending()
  const activeChatId = useActiveChatId()
  const { sendMsg } = useSendMessage()

  const onFocus = useCallback(() => {
    if(!activeChatId) return
    msgService.wsTyping(activeChatId, true)
  }, [activeChatId, msgService])

  const onBlur =  useCallback(() => {
    if(!activeChatId) return
    msgService.wsTyping(activeChatId, false)
  }, [activeChatId, msgService])

  return (
    <Textarea
      name="comment"
      placeholder={"Write your message.."}
      className={className}
      ref={inputRef as RefObject<HTMLTextAreaElement>}
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-readonly={isMsgSending}
      readOnly={isMsgSending}
      onEnter={sendMsg}
    />
  )
})

MessageInputText.displayName = 'MessageInputText'