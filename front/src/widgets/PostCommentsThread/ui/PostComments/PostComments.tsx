import { useGetPostCommentsIds } from '@/entities/Comment';
import { CommentThread } from '../CommentThread/CommentThread.tsx';
import { CommentThreadModal } from '../CommentThreadModal/CommentThreadModal.tsx';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { SeeMoreCommentsButton } from '../SeeMoreCommentsButton/SeeMoreCommentsButton.tsx';
import { memo } from 'react';

const MAX_VISIBLE_COMMENTS = 3

export const PostComments = memo(({ postId }: { postId: string }) => {
  const commentIds = useGetPostCommentsIds(postId);
  const { isOpen, open, close } = useModalControl()

  if(!commentIds.length) return null;
  const visibleComments = commentIds.slice(0, MAX_VISIBLE_COMMENTS);

  return (
    <>
      <CommentThread commentIds={visibleComments} onSeeRepliesClick={open} postId={postId}/>

      {commentIds.length > visibleComments.length && (<SeeMoreCommentsButton onClick={open}/>)}
      <CommentThreadModal commentIds={commentIds} isOpen={isOpen} close={close} postId={postId}/>
    </>
  )
})

PostComments.displayName = 'PostComments';