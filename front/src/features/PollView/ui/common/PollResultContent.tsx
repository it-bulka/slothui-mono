import { memo, useId, useMemo } from 'react';
import { Typography } from '@/shared/ui/Typography/Typography';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { RadioInput } from '@/shared/ui/RadioInput/RadioInput';
import { CheckboxInput } from '@/shared/ui/CheckboxInput/CheckboxInput';
import { PollResultWrapper } from '../PollResult/PollResultWrapper.tsx';
import { OptionLabel } from '../OptionLabel.tsx';
import { PollOptionCard } from './PollOptionCard.tsx';
import { PollMeta } from './PollMeta.tsx';
import { PollSocialProof } from './PollSocialProof.tsx';
import { AnonymousTitle } from './AnonymousTitle.tsx';
import cls from './styles.module.css';
import type { PollResultDto, PollAnswerResultDto } from '@/shared/types/poll.dto.ts';
import type { VoterDetails } from '@/shared/types';

interface PollResultContentProps {
  poll: PollResultDto
}

const getUniqueVoters = (answers: PollAnswerResultDto[]): VoterDetails[] => {
  const seen = new Set<string>()
  const result: VoterDetails[] = []
  for (const answer of answers) {
    for (const voter of answer.voters) {
      if (!seen.has(voter.id)) {
        seen.add(voter.id)
        result.push(voter)
      }
    }
  }
  return result
}

export const PollResultContent = memo(({ poll }: PollResultContentProps) => {
  const id = useId()

  const totalVotes = useMemo(
    () => poll.answers.reduce((sum, a) => sum + a.votes, 0),
    [poll.answers]
  )

  const maxPercentage = useMemo(
    () => Math.max(...poll.answers.map(a => a.percentage)),
    [poll.answers]
  )

  const uniqueVoters = useMemo(
    () => getUniqueVoters(poll.answers),
    [poll.answers]
  )

  const isOptionSelected = (option: PollAnswerResultDto): boolean => {
    if (poll.multiple) {
      return poll.userVote.includes(option.id)
    }
    return Boolean(poll.userVote && option.id === poll.userVote[0])
  }

  const userVoted = poll.multiple
    ? poll.userVote.length > 0
    : poll.userVote !== null

  const InputComponent = poll.multiple ? CheckboxInput : RadioInput

  return (
    <PollResultWrapper pollId={poll.id}>
      <section className={cls.resultSection}>
        <div>
          {poll.anonymous && <AnonymousTitle />}
          <Typography bold type={TypographyTypes.BLOCK_TITLE} className="text-sm">
            {poll.question}
          </Typography>
        </div>

        <PollMeta totalVotes={totalVotes} />

        <div className={cls.optionsList} role="group">
          {poll.answers.map((option) => {
            const selected = isOptionSelected(option)
            const isWinner = option.votes > 0 && option.percentage === maxPercentage

            return (
              <PollOptionCard key={option.id} isSelected={selected} isWinner={isWinner}>
                <InputComponent name={id} disabled selected={selected}>
                  <OptionLabel
                    value={option.value}
                    percentage={option.percentage}
                    voters={poll.anonymous ? [] : option.voters}
                    votes={option.votes}
                  />
                </InputComponent>
              </PollOptionCard>
            )
          })}
        </div>

        <PollSocialProof
          userVoted={userVoted}
          totalVotes={totalVotes}
          voters={uniqueVoters}
          anonymous={poll.anonymous}
        />
      </section>
    </PollResultWrapper>
  )
})

PollResultContent.displayName = 'PollResultContent'
