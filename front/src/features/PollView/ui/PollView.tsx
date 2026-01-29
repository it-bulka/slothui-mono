import { PollEditor } from './PollEditor/PollEditor.tsx';
import { PollReadOnly } from './PollReadOnly/PollReadOnly.tsx';
import type { PollDto, PollResultDto } from '@/shared/types/poll.dto.ts';
import { PollMode } from '../model/types';
import type { PollDraft } from '../../CreatePoll';

interface PollProps {
  mode: PollMode;
  poll: PollDraft | PollDto | PollResultDto
  onEditPollSubmit?: (arg: {pollId: string, answerIds: string[]}) => void
}
export const PollView = ({ poll, mode, onEditPollSubmit }: PollProps) => {
  if (mode === PollMode.EDIT) {
    return <PollEditor poll={poll as PollDto | PollDraft} onSubmit={onEditPollSubmit}/>
  }

  return <PollReadOnly poll={poll as PollResultDto} />
}

PollView.displayName = 'PollView'