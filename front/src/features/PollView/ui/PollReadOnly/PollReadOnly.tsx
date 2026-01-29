import type { PollResultDto } from '@/shared/types/poll.dto.ts';
import { SingleChoiceResult } from '../SingleChoicePoll/SingleChoiceResult.tsx';
import { MultipleChoiceResult } from '../MultipleChoicePoll/MultipleChoiceResult.tsx';

type PollReadOnlyProps = {
  poll: PollResultDto
}

export const PollReadOnly = ({ poll }: PollReadOnlyProps) => {
  if (poll.multiple) {
    return <MultipleChoiceResult poll={poll} />
  }

  return <SingleChoiceResult poll={poll} />
}