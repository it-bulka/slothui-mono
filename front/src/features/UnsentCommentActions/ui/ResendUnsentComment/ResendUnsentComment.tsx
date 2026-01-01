import { useResendComment } from '@/entities';
import { useGetComment } from '@/entities/Comment';

export const ResendUnsentComment = ({ commentId }: { commentId: string }) => {
  const { resendComment } = useResendComment()
  const comment = useGetComment(commentId);

  return (
    <button
      onClick={() => resendComment({ tempId: commentId })}
      className="text-bold"
    >
      {comment.isLoading ? 'Sending...' : 'Resend'}
    </button>
  )
}