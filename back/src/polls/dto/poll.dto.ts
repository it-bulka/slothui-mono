import { Poll } from '../entities/poll.entity';
import { PollAnswer } from '../entities/poll-answer.entity';
import { UserDTO } from 'front/src/shared/types/chat.types';
import { PallParentType } from '../types/poll.type';

type PollType = Pick<
  Poll,
  'id' | 'question' | 'multiple' | 'anonymous' | 'parentType' | 'parentId'
>;
type Answer = Pick<PollAnswer, 'id' | 'value' | 'index'>;

type Vote = {
  id: string;
  answer: Answer;
  user: UserDTO;
  pollId: string;
};

export type PollDto = PollType & {
  answers: Answer[];
};

export type PollWithVotesDto = PollDto & {
  votes: Vote[];
  votesCount: number;
};

export type PollVoter = {
  id: string;
  username: string;
  nickname: string;
  avatarUrl?: string;
};
export type PollAnswerDto = {
  id: string;
  value: string;
  votes: number;
  percentage: number;
  voters: PollVoter[];
};

export type PollResultDto = {
  id: string;
  question: string;
  anonymous: boolean;
  multiple: boolean;
  parentType: PallParentType;
  parentId: string;
  answers: PollAnswerDto[];
  userVote: string[] | null; // [answerId] for single &  answerId[] for multiple
  votesCount: number;
};

export interface PollVotesUpdateDto {
  pollId: string;
  votesCount: number;
  answers: {
    id: string;
    votes: number;
    percentage?: number;
  }[];
}
