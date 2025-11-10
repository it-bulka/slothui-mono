import { Input, Avatar } from '@/shared/ui';
import { SendAction, EmojiAction } from '@/features';
import { AttachAction } from '../AttachAction';
import { useState, useCallback } from 'react';
import type { EmojiClickData } from 'emoji-picker-react';

export const CommentActions = () => {
  const [text, setText] = useState('');

  const onEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
  }, [setText])

  return (
    <div className="flex">
      <Avatar src={'/'}/> {/* TODO: add "me" user */}
      <Input
        name="comment"
        value={text}
        //onChange={(value) => setText(value)}
        placeholder={"Write your comment.."}
        className="grow max-w-[400px] mr-2"
      />
      <div className="flex items-center gap-[6px]">
        <AttachAction />
        <EmojiAction onEmojiClick={onEmojiClick}/>
        <SendAction />
      </div>
    </div>
  )
}