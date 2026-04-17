import { useGetPostCommentsIds } from '@/entities/Comment';
import { CommentThread } from '../CommentThread/CommentThread.tsx';
import { memo } from 'react';
import { Typography } from '@/shared/ui';

export const PostComments = memo(({ postId }: { postId: string }) => {
  const commentIds = useGetPostCommentsIds(postId);

  if (!commentIds.length) return <Typography>No comments yet</Typography>;

  return <CommentThread commentIds={commentIds} postId={postId} />;
})

PostComments.displayName = 'PostComments';