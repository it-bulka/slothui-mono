import { memo } from 'react';
import { Typography } from '@/shared/ui/Typography/Typography';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';
import AvatarDefaultImg from '@/shared/assets/images/general/avatar-default.png';
import type { VoterDetails } from '@/shared/types';

interface PollSocialProofProps {
  userVoted: boolean
  totalVotes: number
  voters: VoterDetails[]
  anonymous: boolean
}

const getSocialText = (userVoted: boolean, totalVotes: number): string => {
  if (userVoted) {
    const others = totalVotes - 1
    if (others <= 0) return 'Voted by you'
    return `Voted by you and ${others} ${others === 1 ? 'other' : 'others'}`
  }
  return `${totalVotes} ${totalVotes === 1 ? 'person' : 'people'} voted`
}

export const PollSocialProof = memo(({
  userVoted,
  totalVotes,
  voters,
  anonymous
}: PollSocialProofProps) => {
  if (anonymous || totalVotes === 0) return null

  return (
    <div className="flex items-center gap-2">
      {voters.length > 0 && (
        <div className="inline-flex -space-x-1.5">
          {voters.slice(0, 3).map((voter) => (
            <ImageWithFallback
              key={voter.id}
              fallback={AvatarDefaultImg}
              src={voter.avatarUrl ?? ''}
              alt={`${voter.nickname}'s avatar`}
              className="block rounded-full w-5 h-5"
            />
          ))}
        </div>
      )}
      <Typography type={TypographyTypes.P_SM} color="secondary" className="!text-[7px]">
        {getSocialText(userVoted, totalVotes)}
      </Typography>
    </div>
  )
})

PollSocialProof.displayName = 'PollSocialProof'
