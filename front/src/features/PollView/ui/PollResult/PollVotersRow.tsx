import { memo } from 'react';
import { AvatarWithInfo } from '@/shared/ui/Avatar/AvatarWithInfo';
import { MorePollVotersButton } from '@/features/MorePollVotersButton';
import type { UserShort } from '@/shared/types';
import cls from './PollResultModal.module.css';

interface PollVotersRowProps {
  voters: UserShort[]
  moreCount: number
  pollId: string
  answerId: string
}

export const PollVotersRow = memo(({
  voters,
  moreCount,
  pollId,
  answerId
}: PollVotersRowProps) => {
  if (voters.length === 0) return null

  return (
    <div className={cls.votersList}>
      {voters.map((voter) => (
        <AvatarWithInfo
          key={voter.id}
          src={voter.avatarUrl}
          name={voter.nickname}
          position={voter.username}
          size="sm"
          titleClass="text-xs"
          textClass="text-[10px]"
          className="gap-2"
        />
      ))}

      <MorePollVotersButton
        moreCount={moreCount}
        pollId={pollId}
        answerId={answerId}
        className="text-xs mt-1"
      />
    </div>
  )
})

PollVotersRow.displayName = 'PollVotersRow'
