import { memo } from 'react';

interface PollMetaProps {
  totalVotes: number
  className?: string
}

export const PollMeta = memo(({ totalVotes, className }: PollMetaProps) => (
  <div className={className}>
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-blue-b1 bg-blue-b4 border border-blue-b2 rounded-full">
      {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
    </span>
  </div>
))

PollMeta.displayName = 'PollMeta'
