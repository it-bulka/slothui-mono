import { ActionButton } from '@/shared/ui';
import CommentSvg from '@/shared/assets/images/post/comment.svg?react'
import CloseSvg from '@/shared/assets/images/actions/close.svg?react'
import { useSelectReplyTargetAuthor } from '@/widgets/CommentActions/model/hooks/useSelectReplyTargetAuthor.ts';
import { useGetReplyTarget, useReplyTarget } from '@/entities';
import { useGetComment } from '@/entities/Comment';

export const ReplyComment = ({ commentId, postId }: { commentId: string, postId: string }) => {
  const { setReplyTarget, clearReplyTargetForComment } = useReplyTarget()
  const author = useSelectReplyTargetAuthor()
  const { parentId } = useGetReplyTarget()

  const comment = useGetComment(commentId);
  if(comment.error || comment.isLoading) return null;

  if(author && parentId && parentId === commentId) {
    return (
      <div className="flex justifyBetween text-[75%] text-blue gap-2 py-2 text-blue-500">
        <p>Replying to <b>@{author.nickname}...</b></p>
        <ActionButton Icon={CloseSvg} onClick={() => clearReplyTargetForComment()}/>
      </div>
    )
  }
  return <ActionButton Icon={CommentSvg}  onClick={() => setReplyTarget({ type: 'comment', parentId: commentId, postId })}/>
}