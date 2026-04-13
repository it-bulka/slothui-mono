import { memo } from 'react';
import { LikePost, CommentPost, SavePost } from '@/features';
import { SharePost } from '../../SharePost';

export const PostActions = memo(({ postId, onCommentClick }: { postId: string, onCommentClick?: () => void}) => {
  return (
    <div className="action-bar">
      <div className="action-btn">
        <LikePost postId={postId} />
      </div>
      <div className="action-btn">
        <CommentPost postId={postId} onCommentClick={onCommentClick} />
      </div>
      <div className="action-btn">
        <SharePost postId={postId} />
      </div>
      <div className="action-btn ml-auto">
        <SavePost postId={postId} />
      </div>
    </div>
  )
})

PostActions.displayName = 'PostActions';