import { useGetRepliesIds } from '@/entities/Comment';
import { CommentItem } from '@/entities';
import { ViewsRepliesButton } from '../ViewsRepliesButton/ViewsRepliesButton.tsx';
import { UnsentCommentActions } from '@/features';

type Props = {
  parentId: string
  level: number
}

export const RepliesList = ({ parentId, level }: Props) => {
  const replyIds = useGetRepliesIds(parentId);

  if (!replyIds.length) return null

  return (
    <div style={{
      paddingLeft: Math.min(level * 8, 64),
    }}
    className="space-y-4"
    >
      {replyIds.map((id) => (
        <CommentItem key={id} commentId={id}>
          <>
            <UnsentCommentActions commentId={id}/>
            <RepliesList parentId={id} level={level + 1}/>
            <ViewsRepliesButton parentId={id} />
          </>
        </CommentItem>
      ))}
    </div>
  )
}
