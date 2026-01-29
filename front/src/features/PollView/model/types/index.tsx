import type { PollAnswerResultDto } from '@/shared/types/poll.dto.ts';

export enum PollMode {
  VIEW = 'VIEW',
  EDIT = 'EDIT'
}

export interface PollFullResult {
  options: PollAnswerResultDto[]
  anonymous?: boolean
}