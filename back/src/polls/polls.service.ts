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
import { UserShortDTO } from '../user/dto/user-response.dto';

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
    if (!pollIds.length) return [];

    const [groupedUserAnswerIds, groupedVotersPreview, uniqueVotersRaw] =
      await Promise.all([
        this.getGroupedAnswersIdsByPoll(pollIds, currentUserId),
        this.getVotersPreview(pollIds, 3),
        this.voteRepo
          .createQueryBuilder('vote')
          .select('vote.pollId', 'pollId')
          .addSelect('COUNT(DISTINCT vote.userId)', 'count')
          .where('vote.pollId IN (:...pollIds)', { pollIds })
          .groupBy('vote.pollId')
          .getRawMany<{ pollId: string; count: string }>(),
      ]);

    const votesByAnswerId = this._buildVotesByAnswerId(pollsRaw);
    const uniqueVotersByPollId = new Map(
      uniqueVotersRaw.map((r) => [r.pollId, Number(r.count)]),
    );

    return pollsEntities.map((poll) => {
      const totalUniqueVoters = uniqueVotersByPollId.get(poll.id) ?? 0;

      const answers: PollAnswerDto[] = poll.answers.map((answer) => {
        const answerVotesCount = votesByAnswerId.get(answer.id) || 0;
        return {
          id: answer.id,
          index: answer.index,
          value: answer.value,
          votes: answerVotesCount,
          percentage: totalUniqueVoters
            ? Math.round((answerVotesCount / totalUniqueVoters) * 100)
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
        votesCount: totalUniqueVoters,
        userVote,
      };
    });
  }

  async getOnePoll(
    pollId: string,
    currentUserId: string,
  ): Promise<PollResultDto | null> {
    const poll = await this.pollRepo.findOne({
      where: { id: pollId },
      relations: ['answers'],
    });
    if (!poll) return null;

    const [userVoteIds, uniqueVotersRaw] = await Promise.all([
      this.getGroupedAnswersIdsByPoll([poll.id], currentUserId),
      this.voteRepo
        .createQueryBuilder('vote')
        .select('COUNT(DISTINCT vote.userId)', 'count')
        .where('vote.pollId = :pollId', { pollId: poll.id })
        .getRawOne<{ count: string }>(),
    ]);
    const totalUniqueVoters = Number(uniqueVotersRaw?.count ?? 0);

    const answers: PollAnswerDto[] = await Promise.all(
      poll.answers.map(async (answer) => {
        const votesCount = await this.voteRepo.count({
          where: { answer: { id: answer.id } },
        });
        const percentage = totalUniqueVoters
          ? Math.round((votesCount / totalUniqueVoters) * 100)
          : 0;

        if (poll.anonymous) {
          return {
            id: answer.id,
            index: answer.index,
            value: answer.value,
            votes: votesCount,
            percentage,
            voters: [],
            nextCursor: null,
            hasMore: false,
          };
        }

        const { voters, nextCursor, hasMore } = await this._getVotersForAnswer(
          poll.id,
          answer.id,
          10,
        );
        return {
          id: answer.id,
          index: answer.index,
          value: answer.value,
          votes: votesCount,
          percentage,
          voters,
          nextCursor,
          hasMore,
        };
      }),
    );

    return {
      id: poll.id,
      question: poll.question,
      anonymous: poll.anonymous,
      multiple: poll.multiple,
      parentType: poll.parentType,
      parentId: poll.parentId,
      answers,
      votesCount: totalUniqueVoters,
      userVote: userVoteIds[poll.id] ?? [],
    };
  }

  /**
   * get answers ids grouped by poll id
   */
  async getGroupedAnswersIdsByPoll(pollIds: string[], userId: string) {
    if (!pollIds.length) return {};

    const raw = await this.voteRepo
      .createQueryBuilder('vote')
      .select(['vote.answerId', 'vote.pollId'])
      .where('vote.pollId IN (:...pollIds)', { pollIds })
      .andWhere('vote.userId = :userId', { userId })
      .getRawMany<{ answerId: string; pollId: string }>();

    return raw.reduce(
      (acc, { pollId, answerId }) => {
        acc[pollId] = [...(acc[pollId] || []), answerId];
        return acc;
      },
      {} as Record<string, string[]>,
    );
  }

  async getVotersPreview(
    pollIds: string[],
    limit = 3,
  ): Promise<Record<string, PollVoter[]>> {
    const result: Record<string, PollVoter[]> = {};

    await Promise.all(
      pollIds.map(async (pollId) => {
        const answers = await this.answerRepo.find({
          where: { poll: { id: pollId } },
        });
        await Promise.all(
          answers.map(async (answer) => {
            const { voters } = await this._getVotersForAnswer(
              pollId,
              answer.id,
              limit,
            );
            result[answer.id] = voters;
          }),
        );
      }),
    );

    return result;
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

    await this.voteRepo.delete({ poll: { id: pollId }, user: { id: userId } });

    const pollAnswers = selectedAnswers.map((answerId) =>
      this.voteRepo.create({
        poll: { id: pollId },
        user: { id: userId },
        answer: { id: answerId },
      }),
    );

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

  async getDetails(pollId: string, currentUserId: string) {
    return this.getOnePoll(pollId, currentUserId);
  }

  async getVoters(
    pollId: string,
    answerId: string,
    limit = 20,
    cursor?: string | null,
  ): Promise<{
    items: UserShortDTO[];
    nextCursor?: string | null;
    hasMore: boolean;
  }> {
    const { voters, nextCursor, hasMore } = await this._getVotersForAnswer(
      pollId,
      answerId,
      limit,
      cursor,
    );
    return { items: voters, nextCursor, hasMore };
  }

  // helpers
  private _buildVotesByAnswerId(raw: { answer_id: string; votes: string }[]) {
    const map = new Map<string, number>();

    raw.forEach(({ answer_id, votes }) => {
      map.set(answer_id, Number(votes) || 0);
    });

    return map;
  }

  private async _getVotersForAnswer(
    pollId: string,
    answerId: string,
    limit: number,
    cursor?: string | null,
  ): Promise<{
    voters: PollVoter[];
    nextCursor?: string | null;
    hasMore: boolean;
  }> {
    let qb = this.voteRepo
      .createQueryBuilder('vote')
      .leftJoinAndSelect('vote.user', 'user')
      .where('vote.pollId = :pollId', { pollId })
      .andWhere('vote.answerId = :answerId', { answerId })
      .orderBy('vote.createdAt', 'ASC');

    if (cursor) {
      qb = qb.andWhere('vote.createdAt > :cursor', {
        cursor: new Date(cursor),
      });
    }

    const votes = await qb.take(limit + 1).getMany(); // +1 для hasMore

    const hasMore = votes.length > limit;
    const voters = votes.slice(0, limit).map((v) => ({
      id: v.user!.id,
      username: v.user!.username,
      nickname: v.user!.nickname,
      avatarUrl: v.user!.avatarUrl,
      email: v.user!.email,
    }));

    const nextCursor = hasMore ? votes[limit].createdAt.toISOString() : null;

    return { voters, nextCursor, hasMore };
  }

  async findPollQuestionsByPostIds(
    postIds: string[],
  ): Promise<Map<string, string>> {
    if (!postIds.length) return new Map();
    const polls = await this.pollRepo
      .createQueryBuilder('poll')
      .select(['poll.parentId', 'poll.question'])
      .where('poll.parentType = :type', { type: 'post' })
      .andWhere('poll.parentId IN (:...ids)', { ids: postIds })
      .getMany();
    return new Map(polls.map((p) => [p.parentId, p.question]));
  }
}
