import { memo } from 'react';
import { LikePost, CommentPost, SavePost } from '@/features';
import { SharePost } from '../../SharePost';

export const PostActions = memo(({ postId }: { postId: string}) => {
  return (
    <div className="flex items-center text-sm font-medium gap-[2%]">
      <LikePost />
      <CommentPost />
      <SharePost postId={postId} />
      <SavePost className="ml-auto"/>
    </div>
  )
})

PostActions.displayName = 'PostActions';