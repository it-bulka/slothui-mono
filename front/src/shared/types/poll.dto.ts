import type { UserShort } from './user.types.ts';
export type PollAnswerDto = {
  id: string
  value: string
  index: number // for sorting, not for logic
  votes?: number
  voters?: string[]
}

export type PollBaseDto = {
  id: string
  question: string
  anonymous: boolean
  multiple: boolean
  parentType: 'message' | 'post'
  parentId: string
  answers: PollAnswerDto[]
}

export type SingleChoicePollDto = PollBaseDto & {
  multiple: false
  userVote: string[] | null // [answerId]
}

export type MultipleChoicePollDto = PollBaseDto & {
  multiple: true
  userVote: string[] // answerIds[]
}

export type PollDto = SingleChoicePollDto | MultipleChoicePollDto

export type PollAnswerResultDto = PollAnswerDto & {
  votes: number
  percentage: number
  voters: UserShort[]
}

export type SingleChoicePollResultDto = Omit<SingleChoicePollDto, 'answers'> & {
  answers: PollAnswerResultDto[]
  multiple: false
  userVote: string[] | null // [answerId]
}

export type MultipleChoicePollResultDto = Omit<MultipleChoicePollDto, 'answers'> & {
  answers: PollAnswerResultDto[]
  multiple: true
  userVote: string[] // answerIds[]
}

export type PollResultDto = SingleChoicePollResultDto | MultipleChoicePollResultDto

// selecting answer
export interface PollVotesUpdateDto {
  pollId: string;
  votesCount: number;
  answers: {
    id: string;
    votes: number;
    percentage?: number;
  }[];
}