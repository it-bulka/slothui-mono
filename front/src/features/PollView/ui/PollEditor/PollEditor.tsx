import type { PollDto } from '@/shared/types/poll.dto.ts';
import { MultipleChoiceEditor } from '../MultipleChoicePoll/MultipleChoiceEditor.tsx';
import { SingleChoiceEditor } from '../SingleChoicePoll/SingleChoiceEditor.tsx';
import type { PollDraft } from '@/features';

type PollEditorProps = {
  poll: PollDto | PollDraft
  onSubmit?: (arg: {pollId: string, answerIds: string[]}) => void
}

export const PollEditor = ({ poll, onSubmit }: PollEditorProps) => {
  if (poll.multiple) {
    return <MultipleChoiceEditor poll={poll} onSubmit={onSubmit} />
  }

  return <SingleChoiceEditor poll={poll} onSubmit={onSubmit} />
}