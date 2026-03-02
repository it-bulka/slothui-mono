import type { PollDto, PollResultDto } from '@/shared/types/poll.dto.ts';
import { PollMode } from '@/features/PollView';

export const getPollMode = (poll: PollDto | PollResultDto): PollMode => {
  return poll.userVote?.length ? PollMode.VIEW : PollMode.EDIT;
}