import type { PollResultDto } from '@/shared/types';
import type { PollDetailsEntity } from '../type/pollDetails.state.ts';

export function mapPollDtoToEntity(dto: PollResultDto): PollDetailsEntity {

  return {
    id: dto.id,
    question: dto.question,
    multiple: dto.multiple,
    anonymous: dto.anonymous,
    userVote: dto.userVote,

    answers: dto.answers.map((answer) => ({
      id: answer.id,
      value: answer.value,
      index: answer.index,
      votes: answer.votes,
      percentage: answer.percentage,

      voters: {
        items: answer.voters ?? [],
        loading: false,
        error: undefined,
        cursor: null,
        hasMore: false
      }
    }))
  }

}