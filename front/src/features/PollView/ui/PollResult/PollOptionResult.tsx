import { Typography } from '@/shared/ui';
import { PollVotersList } from './PollVotersList.tsx';
import type { PollAnswerEntity } from '@/entities/Poll/model/type/pollDetails.state.ts';
import { MorePollVotersButton } from '../../../MorePollVotersButton';

type Props = {
  option: PollAnswerEntity
  anonymous: boolean
  pollId: string
  answerId: string
}

export const PollOptionResult = ({
  option, anonymous, pollId, answerId
}: Props) => {
  const moreCount = option.votes - option.voters.items.length

  return (
    <div>
      <Typography bold className="border-b-2 border-gray-g1 bg-gray-g2">
        {option.value}
      </Typography>

      <Typography className="flex justify-between">
        <span>{option.voters.items.length} votes</span>
        <span>{option.percentage}%</span>
      </Typography>

      {!anonymous && (
        <div>
          <PollVotersList voters={option.voters.items} />
          {moreCount > 0 && (
            <MorePollVotersButton
              moreCount={moreCount}
              pollId={pollId}
              answerId={answerId}
              className={"mx-auto"}
            />
          )}
        </div>
      )}

    </div>
  )
}