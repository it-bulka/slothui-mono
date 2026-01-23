import { memo } from 'react';
import AttachSvg from '@/shared/assets/images/message/attach.svg?react'
import { DraftAttachmentsPreview, EmojiAction, SendAction } from '@/features';
import { twMerge } from 'tailwind-merge';
import { useAddEmojiIntoInput } from '@/features/EmojiAction';
import { AttachAction } from '../AttachAction';
import {
  useDraftMessageExtras,
  useDraftMessageText,
  withDraftMessageProvider
} from '@/features/MessageComposer';
import { useCreatePost } from '@/entities';
import { toast } from 'react-toastify';
import { mapDraftToCreatePost } from './model';
import { useIsPostCreating } from '@/features/PostComposer';

interface PostTextarea {
  className?: string;
}
const PostTextareaRaw = memo(({ className }: PostTextarea) => {
  const { submit: submitExtras, clearExtras } = useDraftMessageExtras()
  const { text, setText, clearText } = useDraftMessageText()
  const { createPost } = useCreatePost()
  const isPostCreating = useIsPostCreating()

  const { handleEmojiClick, inputRef } = useAddEmojiIntoInput<HTMLTextAreaElement>({
    setMsg: setText
  })

  const handlePostSend = () => {
    const extras = submitExtras()

    try {
      const post = mapDraftToCreatePost(text, extras)

      createPost(post)
        .unwrap()
        .then(() => {
          clearExtras();
          clearText()
        })
        .catch((err: Error) => {
          toast.error(err.message || 'Send message failed.')
        });
    } catch (err) {
      toast.error((err as Error).message || 'Send message failed.')
    }
  }

  return (
    <div className={twMerge("flex flex-wrap", className)}>
      <button className="w-6 h-6 text-svg-primary">
        <AttachSvg className="w-5 h-5"/>
      </button>
      <textarea
        className="grow"
        placeholder="What’s on your mind right now?"
        ref={inputRef}
        onChange={e => setText(e.target.value)}
        value={text}
      />

      <div className="flex items-center justify-end gap-[6px] w-full">
        <AttachAction />

        <EmojiAction onEmojiClick={handleEmojiClick} />
        <SendAction onClick={handlePostSend} disabled={isPostCreating} />
      </div>
      <DraftAttachmentsPreview />
    </div>
  )
})

PostTextareaRaw.displayName = 'PostTextarea'

export const PostTextarea = withDraftMessageProvider(PostTextareaRaw)