import { PollResultDto } from './dto/poll.dto';
import { Poll } from './entities/poll.entity';
import { PallParentType } from './types/poll.type';

export class PollMapperToPollResult {
  static transform(poll: Poll): PollResultDto {
    return {
      id: poll.id,
      question: poll.question,
      anonymous: poll.anonymous,
      multiple: poll.multiple,
      parentType: poll.parentId as PallParentType,
      parentId: poll.id,
      answers: poll.answers.map((a) => ({
        id: a.id,
        value: a.value,
        index: a.index,
        votes: 0,
        percentage: 0,
        voters: [],
      })),
      userVote: null,
      votesCount: 0,
    };
  }
}
