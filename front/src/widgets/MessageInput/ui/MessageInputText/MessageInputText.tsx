import { Input } from '@/shared/ui';
import { useDraftMessageText } from '@/features/MessageComposer';
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

  const onFocus = useCallback(() => {
    if(!activeChatId) return
    msgService.wsTyping(activeChatId, true)
  }, [activeChatId, msgService])

  const onBlur =  useCallback(() => {
    if(!activeChatId) return
    msgService.wsTyping(activeChatId, false)
  }, [activeChatId, msgService])

  return (
    <Input
      name="comment"
      placeholder={"Write your message.."}
      className={className}
      ref={inputRef as RefObject<HTMLInputElement>}
      value={text}
      onChange={(val) => setText(val as string)}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-readonly={isMsgSending}
      readOnly={isMsgSending}
    />
  )
})

MessageInputText.displayName = 'MessageInputText'