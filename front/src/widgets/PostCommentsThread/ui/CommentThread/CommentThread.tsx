import { CommentItem } from '@/entities';
import { RepliesList } from '../RepliesList/RepliesList.tsx';
import { ViewsRepliesButton } from '../ViewsRepliesButton/ViewsRepliesButton.tsx';
import { ReplyComment } from '@/shared/ui';
import { UnsentCommentActions } from '@/features';

type Props = {
  commentIds: string[]
  onSeeRepliesClick?: () => void
  postId: string
}

export const CommentThread = ({ commentIds, postId, onSeeRepliesClick }: Props) => {
  return (
    <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-4">
      {commentIds.map((id) => (
        <CommentItem key={id} commentId={id}>
          <>
            <UnsentCommentActions commentId={id}/>
            <ReplyComment commentId={id} postId={postId} />
            <RepliesList parentId={id} level={1}/>

            <ViewsRepliesButton parentId={id} onClick={onSeeRepliesClick}/>
          </>
        </CommentItem>
      ))}
    </div>
  )
}
