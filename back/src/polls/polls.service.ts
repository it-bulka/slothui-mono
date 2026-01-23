import { Injectable } from '@nestjs/common';
import { Poll } from './entities/poll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/createPoll.dto';
import { PollAnswer } from './entities/poll-answer.entity';
import { PallParentType } from './types/poll.type';
import { EntityManager } from 'typeorm';
import { PollDto } from './dto/poll.dto';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepo: Repository<Poll>,
    @InjectRepository(PollAnswer)
    private readonly answerRepo: Repository<PollAnswer>,
  ) {}

  async createPoll(
    dto: CreatePollDto,
    parentType: PallParentType,
    parentId: string,
    manager?: EntityManager,
  ) {
    const pollRepo = manager ? manager.getRepository(Poll) : this.pollRepo;
    const answerRepo = manager
      ? manager.getRepository(PollAnswer)
      : this.answerRepo;

    const poll = pollRepo.create({
      question: dto.question,
      anonymous: dto.anonymous,
      multiple: dto.multiple,
      parentType,
      parentId,
      answers: dto.answers.map((ans, index) =>
        answerRepo.create({ value: ans.value, index }),
      ),
    });

    return await pollRepo.save(poll);
  }

  async getMany(
    parentType: PallParentType,
    parentIds: string[],
  ): Promise<PollDto[]> {
    if (!parentIds.length) return [];
    return (await this.pollRepo
      .createQueryBuilder('poll')
      .leftJoinAndSelect('poll.answers', 'answer')
      .where('poll.parentType = :parentType', { parentType })
      .andWhere('poll.parentId IN (:...ids)', { ids: parentIds })
      .select([
        // poll
        'poll.id',
        'poll.question',
        'poll.anonymous',
        'poll.multiple',
        'poll.parentType',
        'poll.parentId',
        // answer
        'answer.id',
        'answer.value',
        'answer.index',
      ])
      .getMany()) as unknown as PollDto[];
  }

  groupedByParentId(polls: PollDto[]) {
    const grouped = new Map<string, PollDto>();

    polls.forEach((poll) => {
      if (!grouped.has(poll.parentId)) {
        grouped.set(poll.parentId, poll);
      }
    });

    return grouped;
  }
}
