import { AttachAction } from '@/widgets/AttachAction';
import { MessageEmojiAction } from './MessageEmojiAction.tsx';
import { memo } from 'react';
import { SendMessageBtn } from '@/features';

export const MessageActions = memo(() => {
  return (
    <div className="flex items-center gap-[6px]">
      <AttachAction />
      <MessageEmojiAction />
      <SendMessageBtn />
    </div>
  )
})

MessageActions.displayName = 'MessageActions'