import { AddPostBtn } from '@/features';
import { PostTextarea } from '../../../PostTextarea/PostTextarea.tsx';
import { useState, memo } from 'react';

export const AddPostPanel = memo(() => {
  const [isPostTextarea, setPostTextarea] = useState(false);

  return (
    <>
      <AddPostBtn onClick={() => setPostTextarea(prev => !prev)} active={!isPostTextarea} />
      {isPostTextarea && (
        <div className="absolute top-full left-0 right-0 z-[var(--z-index-modal)] bg-underground-primary border-b border-gray-g3 px-8 py-4 shadow-theme">
          <PostTextarea />
        </div>
      )}
    </>
  )
})

AddPostPanel.displayName = "AddPostPanel";