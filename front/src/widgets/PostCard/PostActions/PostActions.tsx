import { memo } from 'react';
import { LikePost, CommentPost, SavePost } from '@/features';
import { SharePost } from '../../SharePost';

export const PostActions = memo(({ postId, onCommentClick }: { postId: string, onCommentClick?: () => void}) => {
  return (
    <div className="flex items-center text-sm font-medium gap-[2%]">
      <LikePost />
      <CommentPost postId={postId} onCommentClick={onCommentClick}/>
      <SharePost postId={postId} />
      <SavePost className="ml-auto"/>
    </div>
  )
})

PostActions.displayName = 'PostActions';