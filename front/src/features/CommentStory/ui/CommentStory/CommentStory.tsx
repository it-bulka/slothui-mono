import { Input } from '@/shared/ui';
import { EmojiAction, SendAction } from '@/features';
import { useMessagesService } from '@/shared/libs/services';
import { useState, useEffect } from 'react';
import { useAddEmojiIntoInput } from '@/features/EmojiAction/model';

interface CommentStoryProps {
  storyId: string
  userId: string
}

export const CommentStory = ({ storyId, userId }: CommentStoryProps) => {
  const messagesService = useMessagesService();
  const [msg, setMsg] = useState('');

  const { handleEmojiClick, inputRef } = useAddEmojiIntoInput<HTMLInputElement>({
    setMsg
  })

  const sendMsg = async () => {
    if(!msg.trim()) return;

    messagesService
      .sendStoryReaction({ text: msg, storyId, receiverId: userId })
      .then(() => setMsg(''))
  }

  useEffect(() => {
    setMsg('')
  }, [storyId, userId, setMsg])

  return (
    <div
      className="flex absolute bottom-0 left-0 w-full px-3 py-1 bg-[rgba(255,255,255,0.5)]"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <Input
        ref={inputRef}
        name="comment"
        value={msg}
        onChange={(value) => setMsg(value as string)}
        onEnter={sendMsg}
        placeholder={"Write your comment.."}
        wrapperClass="grow mr-2"
      />
      <div className="flex items-center gap-[6px]">
        <EmojiAction onEmojiClick={handleEmojiClick} />
        <SendAction onClick={sendMsg}/>
      </div>
    </div>
  )
}