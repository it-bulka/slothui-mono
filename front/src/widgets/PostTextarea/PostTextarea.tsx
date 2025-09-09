import { memo } from 'react';
import AttachSvg from '@/shared/assets/images/message/attach.svg?react'
import { EmojiAction, SendAction, AudioAction } from '@/features';
import { twMerge } from 'tailwind-merge';

interface PostTextarea {
  className?: string;
}
export const PostTextarea = memo(({ className }: PostTextarea) => {
  return (
    <div className={twMerge("flex flex-wrap", className)}>
      <button className="w-6 h-6 text-svg-primary">
        <AttachSvg className="w-5 h-5"/>
      </button>
      <textarea className="grow" placeholder="What’s on your mind right now?"/>

      <div className="flex items-center justify-end gap-[6px] w-full">
        <EmojiAction />
        <AudioAction />
        <SendAction />
      </div>
    </div>
  )
})

PostTextarea.displayName = 'PostTextarea'