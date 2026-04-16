import { Textarea } from '@/shared/ui';
import { useDraftMessageText } from '@/features/DraftMessage';
import { useSendMessage } from '@/features/send-message/model';
import { type RefObject, memo, useCallback, useRef, useEffect } from 'react';
import { useMessagesService } from '@/shared/libs/services';
import { useActiveChatId, useSelectIsMessageSending } from '@/entities';

const TYPING_STOP_DELAY = 2000;

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

  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTypingRef = useRef(false)

  const stopTyping = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
      typingTimerRef.current = null
    }
    if (isTypingRef.current && activeChatId) {
      isTypingRef.current = false
      msgService.wsTyping(activeChatId, false)
    }
  }, [activeChatId, msgService])

  // cleanup on unmount or chat change
  useEffect(() => {
    return () => stopTyping()
  }, [stopTyping])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
    if (!activeChatId) return

    if (!isTypingRef.current) {
      isTypingRef.current = true
      msgService.wsTyping(activeChatId, true)
    }

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    typingTimerRef.current = setTimeout(stopTyping, TYPING_STOP_DELAY)
  }, [activeChatId, msgService, setText, stopTyping])

  const onBlur = useCallback(() => {
    stopTyping()
  }, [stopTyping])

  return (
    <Textarea
      name="comment"
      placeholder={"Write your message.."}
      className={className}
      ref={inputRef as RefObject<HTMLTextAreaElement>}
      value={text}
      onChange={handleChange}
      onBlur={onBlur}
      aria-readonly={isMsgSending}
      readOnly={isMsgSending}
      onEnter={sendMsg}
    />
  )
})

MessageInputText.displayName = 'MessageInputText'