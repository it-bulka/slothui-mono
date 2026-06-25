import { ActionButton } from '@/shared/ui/ActionButton';
import SaveSvg from '@/shared/assets/images/post/store.svg?react'
import { usePostSaveSelect, useToggleSavePost } from '@/entities/Post';
import { memo, useCallback } from 'react';

export const SavePost = memo(({ className, postId }: { className: string, postId: string }) => {
  const { isSaved } = usePostSaveSelect(postId);
  const { toggleSavePost } = useToggleSavePost()

  const handleToggle = useCallback(() => {
    toggleSavePost({ postId, saved: isSaved });
  }, [toggleSavePost, postId, isSaved]);

  return (
    <ActionButton Icon={SaveSvg} className={className} isActive={isSaved} onClick={handleToggle} aria-label={isSaved ? 'Unsave' : 'Save'}/>
  )
})

SavePost.displayName = 'SavePost';