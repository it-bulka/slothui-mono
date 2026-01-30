import { AddPostBtn } from '@/features';
import { PostTextarea } from '../../../PostTextarea/PostTextarea.tsx';
import { useState, memo } from 'react';

export const AddPostPanel = memo(() => {
  const [isPostTextarea, setPostTextarea] = useState(false);

  return (
    <>
      <AddPostBtn onClick={() => setPostTextarea(prev => !prev)} active={!isPostTextarea} />
      {isPostTextarea && <PostTextarea className="basis-full py-6 absolute top-full left-0 w-full"/>}
    </>
  )
})

AddPostPanel.displayName = "AddPostPanel";