import { PollView } from '@/features/PollView';
import { PollMode } from '@/features/PollView/model/types';
import { useDraftMessageExtras } from '@/features/DraftMessage';
import { ClearDraftButton } from '../ClearDraftButton/ClearDraftButton.tsx';
import { Typography } from '@/shared/ui';

export const DraftPollView = () => {
  const { poll, clearPoll } = useDraftMessageExtras();
  if (!poll) return null;

  return (
    <div className="relative w-full">
      <div className="flex justifyBetween alignCenter">
        <Typography bold>Preview</Typography>
        <ClearDraftButton onClick={clearPoll} />
      </div>

      <PollView poll={poll} mode={PollMode.EDIT}/>
    </div>
  )
}