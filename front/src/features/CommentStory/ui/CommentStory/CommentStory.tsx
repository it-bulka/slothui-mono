import { Input } from '@/shared/ui';
import { EmojiAction, SendAction } from '@/features';
import { useStoriesService } from '@/shared/libs/services';
import { useState, useEffect } from 'react';
import { useAddEmojiIntoInput } from '@/features/EmojiAction/model';

interface CommentStoryProps {
  storyId: string
  userId: string
}

export const CommentStory = ({ storyId, userId }: CommentStoryProps) => {
  const storiesService = useStoriesService();
  const [msg, setMsg] = useState('');

  const { handleEmojiClick, inputRef } = useAddEmojiIntoInput<HTMLInputElement>({
    setMsg
  })

  const sendMsg = async () => {
    if(!msg.trim()) return;

    storiesService
      .sendMessage({ text: msg, storyId, ownerId: userId })
      .then(() => setMsg(''))

    //TODO: delete after connecting to backend
    setMsg('')
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