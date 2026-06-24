import { AddPostBtn } from '@/features/AddPostBtn';
import { PostTextarea } from '../../../PostTextarea/PostTextarea.tsx';
import { useState, memo } from 'react';

export const AddPostPanel = memo(({ btnClassName }: { btnClassName?: string }) => {
  const [isPostTextarea, setPostTextarea] = useState(false);

  return (
    <>
      <AddPostBtn onClick={() => setPostTextarea(prev => !prev)} active={!isPostTextarea} className={btnClassName} />
      {isPostTextarea && (
        <div className="absolute top-full left-0 right-0 z-[var(--z-index-modal)] bg-light-l2 backdrop-blur-[12px] border-b border-gray-g3 rounded-b-[var(--radius-xl)] px-8 py-6 shadow-theme-lg">
          <PostTextarea />
        </div>
      )}
    </>
  )
})

AddPostPanel.displayName = "AddPostPanel";