import { memo } from 'react';
import { PollResultContent } from '../common/PollResultContent.tsx';
import type { SingleChoicePollResultDto } from '@/shared/types/poll.dto.ts';

export type SingleChoiceResultProps = {
  poll: SingleChoicePollResultDto
}

export const SingleChoiceResult = memo(({ poll }: SingleChoiceResultProps) => (
  <PollResultContent poll={poll} />
))

SingleChoiceResult.displayName = 'SingleChoiceResult'
