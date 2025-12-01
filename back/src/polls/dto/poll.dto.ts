import { Poll } from '../entities/poll.entity';
import { PollAnswer } from '../entities/poll-answer.entity';
import { UserDTO } from 'front/src/shared/types/chat.types';

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
