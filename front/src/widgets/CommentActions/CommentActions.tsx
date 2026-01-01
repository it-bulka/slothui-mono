import { Input, Avatar } from '@/shared/ui';
import { SendAction, EmojiAction } from '@/features';
import { AttachAction } from '../AttachAction';
import { useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSelectReplyTargetAuthor } from './model/hooks/useSelectReplyTargetAuthor.ts';
import { useAddEmojiIntoInput } from '@/features/EmojiAction/model';
import { useSendComment } from './model/hooks/useSendComment.tsx';
import { useGetReplyTarget } from '@/entities';

export const CommentActions = ({ className }: { className?: string }) => {
  const author = useSelectReplyTargetAuthor()
  const [text, setText] = useState(author ? `@${author.nickname}` : '');
  const { sendComment } = useSendComment()
  const replyTarget = useGetReplyTarget()

  const { handleEmojiClick, inputRef } = useAddEmojiIntoInput<HTMLInputElement>({
    setMsg: setText
  })

  const handleSendComment = useCallback(() => {
    if(!replyTarget.postId) return
    if(!replyTarget.parentId  && replyTarget.type === 'comment') return;

    sendComment(
      {
        text,
        postId: replyTarget.postId,
        parentId: replyTarget.parentId
      },
      () => {
        setText('')
      })
  }, [text, sendComment, replyTarget, setText])

  return (
    <div className={twMerge(`flex ${className}`)}>
      <Avatar src={'/'}/> {/* TODO: add "me" user */}
      <Input
        ref={inputRef}
        name="comment"
        value={text}
        onChange={(value) => setText(value as string)}
        placeholder={"Write your comment.."}
        wrapperClass="grow mr-2"
      />
      <div className="flex items-center gap-[6px]">
        <AttachAction />
        <EmojiAction onEmojiClick={handleEmojiClick}/>
        <SendAction onClick={handleSendComment}/>
      </div>
    </div>
  )
}