import { PollMode } from '@/features/PollView';
import type { PollDto, PollResultDto } from '@/shared/types/poll.dto.ts';

export const getPollMode = (poll: PollDto | PollResultDto): PollMode => {
 return poll.userVote?.length ? PollMode.VIEW : PollMode.EDIT;
}