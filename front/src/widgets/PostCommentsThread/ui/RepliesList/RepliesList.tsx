import { useGetRepliesIds } from '@/entities/Comment';
import { CommentItem } from '@/entities';
import { ViewsRepliesButton } from '../ViewsRepliesButton/ViewsRepliesButton.tsx';
import { UnsentCommentActions } from '@/features';

const INDENT_CLASSES = ['pl-0', 'pl-2', 'pl-4', 'pl-6', 'pl-8', 'pl-10', 'pl-12', 'pl-14', 'pl-16'] as const;

type Props = {
  parentId: string
  level: number
}

export const RepliesList = ({ parentId, level }: Props) => {
  const replyIds = useGetRepliesIds(parentId);

  if (!replyIds.length) return null

  const indentClass = INDENT_CLASSES[Math.min(level, INDENT_CLASSES.length - 1)];

  return (
    <div className={`${indentClass} space-y-4`}
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
