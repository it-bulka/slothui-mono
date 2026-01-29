import { PollView } from '@/features/PollView';
import { PollMode } from '@/features/PollView/model/types';
import { useDraftMessageExtras } from '@/features/MessageComposer';
import { ClearDraftButton } from '../ClearDraftButton/ClearDraftButton.tsx';

export const DraftPollView = () => {
  const { poll, clearPoll } = useDraftMessageExtras();
  if (!poll) return null;

  return (
    <div className="relative">
      <ClearDraftButton onClick={clearPoll} />
      <PollView poll={poll} mode={PollMode.EDIT}/>
    </div>
  )
}