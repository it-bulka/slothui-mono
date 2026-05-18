import { memo } from 'react';
import { LikePost } from '@/features/LikePost';
import { CommentPost } from '@/features/CommentPost';
import { SavePost } from '@/features/SavePost';
import { SharePost } from '../../SharePost';
import { useMediaQuery } from '@/shared/hooks';

export const PostActions = memo(({ postId, text, onCommentClick }: { postId: string, text?: string, onCommentClick?: () => void}) => {
  const isCompact = useMediaQuery('(max-width: 1279px)');

  return (
    <div className="action-bar">
      <LikePost postId={postId} showText={!isCompact} className="action-btn" />
      <CommentPost postId={postId} onCommentClick={onCommentClick} showText={!isCompact} className="action-btn" />
      <SharePost postId={postId} text={text} showText={!isCompact} className="action-btn"/>

      <SavePost postId={postId} className="action-btn ml-auto"/>
    </div>
  )
})

PostActions.displayName = 'PostActions';