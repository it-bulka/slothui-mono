import type { PropsWithChildren } from 'react';
import { useGetComment } from '../../model/hooks';
import { Avatar } from '@/shared/ui';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import { formatDate } from '@/shared/libs';

type Props = {
  commentId: string
  className?: string
}

export const CommentItem = ({ commentId, children, className }: PropsWithChildren<Props>) => {
  const comment = useGetComment(commentId);

  if (!comment) return null

  return (
    <div className={twMerge(classnames("relative py-1 pl-12", { 'opacity-50': comment.error }, [className]))}>
      {/* thread connector */}
      <div className="absolute left-5 top-6 w-5 h-[calc(100%-18px)] border-l-2 border-b-2 border-gray-g3 rounded-bl-xl pointer-events-none" />

      <Avatar
        src={comment.author.avatarUrl}
        name={comment.author?.username}
        size="sm"
        className="absolute top-1 left-5 -translate-x-1/2"
      />

      <div className="rounded-2xl bg-light-l3 px-3 py-2">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-dark">@{comment.author.nickname}</span>
          <span className="text-[11px] text-gray-g1 ml-auto">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-dark mt-0.5 leading-snug">{comment.text}</p>
      </div>

      {children}
    </div>
  )
}
