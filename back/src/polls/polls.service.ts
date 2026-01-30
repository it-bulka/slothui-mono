import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Poll } from './entities/poll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/createPoll.dto';
import { PollAnswer } from './entities/poll-answer.entity';
import { PollVote } from './entities/poll-vote.entity';
import { PallParentType } from './types/poll.type';
import { EntityManager } from 'typeorm';
import { PollResultDto, PollVoter } from './dto/poll.dto';
import { PollAnswerDto } from './dto/poll.dto';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepo: Repository<Poll>,
    @InjectRepository(PollAnswer)
    private readonly answerRepo: Repository<PollAnswer>,
    @InjectRepository(PollVote)
    private readonly voteRepo: Repository<PollVote>,
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
    currentUserId: string,
  ): Promise<PollResultDto[]> {
    if (!parentIds.length) return [];

    // polls with answers and votes
    const { entities: pollsEntities, raw: pollsRaw } = await this.pollRepo
      .createQueryBuilder('poll')
      .leftJoinAndSelect('poll.answers', 'answer')
      .leftJoin(
        (qb) =>
          qb
            .from(PollVote, 'vote')
            .select('vote.answerId', 'answerId')
            .addSelect('COUNT(vote.id)', 'votes')
            .groupBy('vote.answerId'),
        'voteStats',
        '"voteStats"."answerId" = "answer"."id"',
      )
      .addSelect('COALESCE("voteStats"."votes", 0)', 'votes')
      .where('poll.parentType = :parentType', { parentType })
      .andWhere('poll.parentId IN (:...ids)', { ids: parentIds })
      .getRawAndEntities<{
        votes: string; // COUNT as string
        answer_id: string;
      }>();

    const pollIds = pollsEntities.map((p) => p.id);

    const [groupedUserAnswerIds, groupedVotersPreview] = await Promise.all([
      this.getGroupedAnswersIdsByPoll(pollIds, currentUserId),
      this.getVotersPreview(pollIds, 3),
    ]);

    const votesByAnswerId = this._buildVotesByAnswerId(pollsRaw);

    return pollsEntities.map((poll) => {
      const totalPollVotes = this._countTotalVotes(
        poll.answers,
        votesByAnswerId,
      );

      const answers: PollAnswerDto[] = poll.answers.map((answer) => {
        const answerVotesCount = votesByAnswerId.get(answer.id) || 0;
        return {
          id: answer.id,
          index: answer.index,
          value: answer.value,
          votes: answerVotesCount,
          percentage: answerVotesCount
            ? Math.round((answerVotesCount / Number(totalPollVotes)) * 100)
            : 0,
          voters: poll.anonymous ? [] : groupedVotersPreview[answer.id],
        };
      });
      const userVote = groupedUserAnswerIds[poll.id];
      return {
        id: poll.id,
        question: poll.question,
        anonymous: poll.anonymous,
        multiple: poll.multiple,
        parentType: poll.parentType,
        parentId: poll.parentId,
        answers,
        votesCount: totalPollVotes,
        userVote,
      };
    });
  }

  async getOnePoll(
    pollId: string,
    currentUserId: string,
  ): Promise<PollResultDto | null> {
    const { entities: pollsEntities, raw: pollsRaw } = await this.pollRepo
      .createQueryBuilder('poll')
      .leftJoinAndSelect('poll.answers', 'answer')
      .leftJoin(
        (qb) =>
          qb
            .from(PollVote, 'vote')
            .select('vote.pollId', 'pollId')
            .addSelect('vote.answerId', 'answerId')
            .addSelect('COALESCE(COUNT(vote.id), 0)', 'votes')
            .groupBy('vote.pollId')
            .addGroupBy('vote.answerId'),
        'voteStats',
        '"voteStats"."answerId" = "answer"."id" AND "voteStats"."pollId" = "poll"."id"',
      )
      .addSelect('COALESCE("voteStats"."votes", 0)', 'votes')
      .where('poll.id = :pollId', { pollId }) // тільки один poll
      .getRawAndEntities<{ votes: string; answer_id: string }>();

    const poll = pollsEntities[0];
    if (!poll) return null;

    const votesByAnswerId = this._buildVotesByAnswerId(pollsRaw);

    const [groupedUserAnswerIds, groupedVotersPreview] = await Promise.all([
      this.getGroupedAnswersIdsByPoll([poll.id], currentUserId),
      this.getVotersPreview([poll.id], 3),
    ]);

    const totalPollVotes = poll.answers.reduce((sum, a) => {
      const answerVotes = votesByAnswerId.get(a.id) || 0;
      return sum + answerVotes;
    }, 0);

    const answers: PollAnswerDto[] = this._mapAnswersToDto(
      poll,
      votesByAnswerId,
      totalPollVotes,
      groupedVotersPreview,
    );

    const userVote = groupedUserAnswerIds[poll.id];

    return {
      id: poll.id,
      question: poll.question,
      anonymous: poll.anonymous,
      multiple: poll.multiple,
      parentType: poll.parentType,
      parentId: poll.parentId,
      answers,
      votesCount: totalPollVotes,
      userVote,
    };
  }

  /**
   * get answers ids grouped by poll id
   */
  async getGroupedAnswersIdsByPoll(pollIds: string[], userId: string) {
    if (!pollIds.length) return {};

    const userAnswerIdsRaw = await this.voteRepo
      .createQueryBuilder('vote')
      .select(['vote.answerId', 'vote.pollId'])
      .where('vote.pollId IN (:...pollIds)', { pollIds })
      .andWhere('vote.userId = :userId', { userId })
      .getRawMany<{ answerId: string; pollId: string }>();

    const groupedUserAnswerIds = userAnswerIdsRaw.reduce(
      (acc, item) => {
        if (acc[item.pollId]) {
          acc[item.pollId].push(item.answerId);
          return acc;
        }

        acc[item.pollId] = [item.answerId];
        return acc;
      },
      {} as Record<string, string[]>, // Record<pollId, answerId[]>
    );

    return groupedUserAnswerIds;
  }

  async getVotersPreview(pollIds: string[], limit?: number) {
    if (!pollIds.length) return {};

    const qb = this.voteRepo
      .createQueryBuilder('vote')
      .leftJoin('vote.user', 'user')
      .addSelect(['user.id', 'user.name', 'user.nickname', 'user.avatarUrl'])
      .where('vote.pollId IN (:...ids)', { ids: pollIds })
      .andWhere('vote.user IS NOT NULL')
      .orderBy('vote.createdAt', 'DESC');

    if (limit) {
      qb.limit(3);
    }

    const votersPreview = await qb.getMany();

    const groupedVotersPreview = votersPreview.reduce(
      (acc, item) => {
        if (!item.user) return acc;

        acc[item.id] = [
          {
            id: item.user.id,
            username: item.user.name,
            nickname: item.user.nickname,
            avatarUrl: item.user.avatarUrl,
          },
        ];
        return acc;
      },
      {} as Record<string, PollVoter[]>, // Record<pollId, PollVoter>
    );

    return groupedVotersPreview;
  }

  groupedByParentId(polls: PollResultDto[]) {
    const grouped = new Map<string, PollResultDto>();

    polls.forEach((poll) => {
      if (!grouped.has(poll.parentId)) {
        grouped.set(poll.parentId, poll);
      }
    });

    return grouped;
  }

  async selectAnswers({
    pollId,
    selectedAnswers,
    userId,
  }: {
    pollId: string;
    selectedAnswers: string[];
    userId: string;
  }): Promise<PollResultDto> {
    const poll = await this.pollRepo.findOne({ where: { id: pollId } });
    if (!poll) {
      throw new NotFoundException(`pollId ${pollId} not found`);
    }

    if (!poll.multiple && selectedAnswers.length > 1) {
      throw new BadRequestException(
        'This poll allows selecting only one answer.',
      );
    }

    const pollAnswers = selectedAnswers.map((answerId) => {
      return this.voteRepo.create({
        poll: { id: pollId },
        user: { id: userId },
        answer: { id: answerId },
      });
    });

    await this.voteRepo.save(pollAnswers);

    const updatedPollData = await this.getOnePoll(poll.id, userId);
    if (!updatedPollData) {
      throw new NotFoundException(`pollId ${pollId} not found`);
    }

    // TODO: add WS broadcast
    /*
    // for updating for others user via WS
    const updatedPollDataWs: PollVotesUpdateDto = {
      pollId: updatedPollData.id,
      votesCount: updatedPollData.votesCount,
      answers: updatedPollData.answers.map((a) => ({
        id: a.id,
        votes: a.votes,
        percentage: a.percentage,
      })),
    };
    wsServer.broadcastToPollSubscribers(pollId, updatedPollDataWs);
    */

    return updatedPollData;
  }

  // helpers
  private _buildVotesByAnswerId(raw: { answer_id: string; votes: string }[]) {
    const map = new Map<string, number>();

    raw.forEach(({ answer_id, votes }) => {
      map.set(answer_id, Number(votes) || 0);
    });

    return map;
  }

  private _countTotalVotes(
    answers: PollAnswer[],
    votesByAnswerId: Map<string, number>, // <answerId, count>
  ) {
    return answers.reduce(
      (sum, answer) => sum + (votesByAnswerId.get(answer.id) ?? 0),
      0,
    );
  }

  private _mapAnswersToDto(
    poll: Poll,
    votesByAnswerId: Map<string, number>,
    totalVotes: number,
    votersPreview: Record<string, PollVoter[]>,
  ): PollAnswerDto[] {
    return poll.answers.map((answer) => {
      const votes = votesByAnswerId.get(answer.id) ?? 0;

      return {
        id: answer.id,
        index: answer.index,
        value: answer.value,
        votes,
        percentage: totalVotes ? Math.round((votes / totalVotes) * 100) : 0,
        voters: poll.anonymous ? [] : (votersPreview[answer.id] ?? []),
      };
    });
  }
}
