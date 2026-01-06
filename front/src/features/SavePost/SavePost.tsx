import { ActionButton } from '@/shared/ui';
import SaveSvg from '@/shared/assets/images/post/store.svg?react'
import { usePostSaveSelect, useToggleSavePost } from '@/entities';
import { memo } from 'react';

export const SavePost = memo(({ className, postId }: { className: string, postId: string }) => {
  const { isSaved } = usePostSaveSelect(postId);
  const { toggleSavePost } = useToggleSavePost()
  return (
    <ActionButton Icon={SaveSvg} className={className} onClick={() => toggleSavePost({ postId, saved: isSaved })}/>
  )
})

SavePost.displayName = 'SavePost';