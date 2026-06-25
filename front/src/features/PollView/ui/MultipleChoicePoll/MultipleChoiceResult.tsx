import { memo } from 'react';
import { PollResultContent } from '../common/PollResultContent.tsx';
import type { MultipleChoicePollResultDto } from '@/shared/types/poll.dto.ts';

export interface MultipleChoiceResultProps {
  poll: MultipleChoicePollResultDto
}

export const MultipleChoiceResult = memo(({ poll }: MultipleChoiceResultProps) => (
  <PollResultContent poll={poll} />
))

MultipleChoiceResult.displayName = 'MultipleChoiceResult'
