import { Typography } from '@/shared/ui';
import { ResendUnsentComment } from '../ResendUnsentComment/ResendUnsentComment.tsx';
import { DeleteUnsentComment } from '../DeleteUnsentComment/DeleteUnsentComment.tsx';
import { useGetComment } from '@/entities/Comment';


export const UnsentCommentActions = ({ commentId }: { commentId: string }) => {
  const comment = useGetComment(commentId);
  if(!comment.error) return null;

  return (
    <div className="flex gap-5 pr-5">
      <Typography className="grow" color="error" bold>Not sent</Typography>

      <ResendUnsentComment commentId={commentId} />
      <DeleteUnsentComment commentId={commentId} />
    </div>
)
}