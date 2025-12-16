import { PollView } from '@/features/PollView';
import { PollMode } from '@/features/PollView/model/types';
import { useId } from 'react';
import { useDraftMessage } from '@/features/MessageComposer';
import { ClearDraftButton } from '../ClearDraftButton/ClearDraftButton.tsx';

export const DraftPollView = () => {
  const id = useId();
  const { draft: { poll }, clearPoll } = useDraftMessage();
  if (!poll) return null;

  return (
    <div className="relative">
      <ClearDraftButton onClick={clearPoll} />
      <PollView
        isMultiple={poll.multiple}
        options={poll.answers}
        mode={PollMode.EDIT}
        question={poll.question}
        questionId={id}
      />
    </div>
  )
}