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
    <div className={twMerge(classnames("relative p-[4px] pl-12 rounded-sm", { 'bg-red-50': comment.error }, [className]))}>
      {/* reply-connector */}
      <div className="absolute left-5 top-[8px] w-[24px] h-[100%] border-l border-b border-neutral-300 rounded-bl-xl" />
      <Avatar
        src={comment.author.avatarUrl}
        name={comment.author?.username}
        size="sm"
        className="absolute top-[8px] left-5 -translate-x-1/2"
      />

      <div>
        <div className="flex">
          <b className="grow">@{comment.author.nickname}</b>

          <p className="text-[75%]">{formatDate(comment.createdAt)}</p>
        </div>

        <p className="grow">{comment.text}</p>
      </div>
      {children}
    </div>
  )
}
