import { memo } from 'react';
import { LikePost, CommentPost, SharePost, SavePost } from '@/features';

export const PostActions = memo(() => {
  return (
    <div className="flex items-center text-sm font-medium gap-[2%]">
      <LikePost />
      <CommentPost />
      <SharePost />
      <SavePost className="ml-auto"/>
    </div>
  )
})

PostActions.displayName = 'PostActions';