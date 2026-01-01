import { useFetchReplies, useGetComment, useGetRepliesIds, useGetRepliesLoading, useGetRepliesError } from '@/entities/Comment';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const ViewsRepliesButton = ({ parentId, onClick }: { parentId: string, onClick?: () => void }) => {
  const replies = useGetRepliesIds(parentId)
  const loading = useGetRepliesLoading(parentId)
  const error = useGetRepliesError(parentId)

  const comment = useGetComment(parentId)
  const { fetchReplies } = useFetchReplies()

  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error]);

  if (comment.repliesCount > 0 && comment.repliesCount > replies.length) {
    const count = replies.length ? `${comment.repliesCount - replies.length} more` : comment.repliesCount
    return (
      <button
        onClick={() => {
          onClick?.()
          fetchReplies({ parentId, postId: comment.postId })
            .unwrap()
            .then(() => onClick?.())
        }}
        className="block text-[75%] opacity-90 translate-y-1/2"
        disabled={loading}
      >
        {(loading && !error) ? 'Loading...' : `View replies: ${count}`}
      </button>
    )
  }

}