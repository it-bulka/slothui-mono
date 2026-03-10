import { Button } from '@/shared/ui';
import { useFetchMorePollVoters, selectAnswerVoters } from '@/entities/Poll';
import { useAppSelector } from '@/shared/config/redux';
import { memo } from 'react';

interface MorePollVotersButtonProps {
  moreCount: number
  pollId: string
  answerId: string
  className?: string
}
export const MorePollVotersButton = memo(({ moreCount, pollId, answerId, className }: MorePollVotersButtonProps) => {
  const { fetchVoters } = useFetchMorePollVoters()
  const votersState = useAppSelector(selectAnswerVoters(pollId, answerId))
  if (!votersState || !votersState.hasMore) return null

  return (
    <Button
      onClick={() => fetchVoters({pollId, answerId, cursor: votersState.cursor })}
      className={className}
    >
      +{moreCount} more
    </Button>
  )
})

MorePollVotersButton.displayName = 'MorePollVotersButton'