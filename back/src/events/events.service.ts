import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from './entity/event.entity';
import { EventParticipant, EventResponseDto } from './dto/event.dto';
import { User } from '../user/entities/user.entity';
import { PaginatedResponse } from '../common/types/pagination.type';
import { checkNextCursor } from '../common/utils/checkNextCursor';
import { mapToEventDTO } from './utils/mapToEventDto';
import { RedisService } from '../redis/redis.service';
import { CACHE_KEYS } from '../redis/redis.cache-keys';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepo: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly cache: RedisService,
  ) {}

  async create(userId: string, dto: CreateEventDto) {
    const organizer = await this.userRepo.findOne({ where: { id: userId } });
    if (!organizer) throw new NotFoundException('User not found');
    const event = this.eventsRepo.create({
      organizer,
      title: dto.title,
      description: dto.description,
      date: dto.date,
      location: dto.location,
      category: dto.category ?? null,
      coverUrl: null,
      onlineUrl: dto.onlineUrl ?? null,
    });

    const created = await this.eventsRepo.save(event);

    return mapToEventDTO({
      ...created,
      organizer: {
        id: organizer.id,
        username: organizer.username,
        nickname: organizer.nickname,
        avatarUrl: organizer.avatarUrl,
      },
    });
  }

  async deleteEvent(eventId: string, userId: string) {
    const event = await this.eventsRepo.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organizer.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this event');
    }

    await this.eventsRepo.remove(event);

    await Promise.all([
      this.cache.delByPattern(`event:${eventId}:*`),
      this.cache.del(CACHE_KEYS.eventCount(eventId)),
    ]);
  }

  async getSubscribedEvents(
    userId: string,
    { pageSize = 10, cursor }: { pageSize?: number; cursor?: string } = {},
  ): Promise<PaginatedResponse<EventResponseDto>> {
    const events = await this.eventsRepo
      .createQueryBuilder('event')
      .innerJoin('event.organizer', 'organizer')
      .innerJoin('event.participants', 'participant')
      .select([
        'event.id AS id',
        'event.title AS title',
        'event.description AS description',
        'event.date AS date',
        'event.location AS location',
        'event.category AS category',
        'event.coverUrl AS "coverUrl"',
        'event.onlineUrl AS "onlineUrl"',
        'event.createdAt AS createdAt',
        `json_build_object(
           'id', organizer.id,
           'username', organizer.username,
           'nickname', organizer.nickname,
           'avatar', organizer.avatar
         ) AS organizer`,
        'TRUE AS "isSubscribed"',
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from('event_participants', 'ep')
          .where('ep.event_id = event.id');
      }, 'participantsCount')
      .where('participant.id = :userId', { userId })
      .andWhere(cursor ? 'event.date < :cursor' : '1=1', { cursor })
      .orderBy('event.date', 'DESC')
      .limit(pageSize + 1)
      .getRawMany<EventResponseDto>();

    const mapped = events.map((e) => ({
      ...e,
      participantsCount: Number(e.participantsCount),
    }));
    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items: mapped,
      cursorField: 'date',
      limit: pageSize,
    });

    return {
      items: resultItems,
      nextCursor,
      hasMore,
    };
  }

  async getOrganizedEvents(
    userId: string,
    {
      pageSize = 10,
      cursor,
      currentUserId,
    }: { pageSize?: number; cursor?: string; currentUserId?: string } = {},
  ): Promise<PaginatedResponse<EventResponseDto>> {
    const qb = this.eventsRepo
      .createQueryBuilder('event')
      .innerJoin('event.organizer', 'organizer')
      .select([
        'event.id AS id',
        'event.title AS title',
        'event.description AS description',
        'event.date AS date',
        'event.location AS location',
        'event.category AS category',
        'event.coverUrl AS "coverUrl"',
        'event.onlineUrl AS "onlineUrl"',
        'event.createdAt AS createdAt',
        `json_build_object(
           'id', organizer.id,
           'username', organizer.username,
           'avatar', organizer."avatarUrl"
         ) AS organizer`,
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from('event_participants', 'ep')
          .where('ep.event_id = event.id');
      }, 'participantsCount')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*) > 0')
          .from('event_participants', 'ep')
          .where('ep.event_id = event.id')
          .andWhere('ep.user_id = :currentUserId');
      }, 'isSubscribed')
      .setParameter('currentUserId', currentUserId ?? null)
      .where('organizer.id = :userId', { userId });

    if (cursor) {
      qb.andWhere('event.date < :cursor', { cursor });
    }

    qb.orderBy('event.date', 'DESC').limit(pageSize + 1);

    const events = await qb.getRawMany<EventResponseDto>();
    const mapped = events.map((e) => ({
      ...e,
      participantsCount: Number(e.participantsCount),
    }));
    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items: mapped,
      cursorField: 'date',
      limit: pageSize,
    });

    return {
      items: resultItems,
      nextCursor,
      hasMore,
    };
  }

  async findOne(id: string) {
    const event = await this.eventsRepo.findOne({
      where: { id: id },
      relations: ['organizer'],
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const isSubscribed = await this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.participatingEvents', 'event')
      .where('user.id = :userId', { userId: event.organizer.id })
      .andWhere('event.id = :eventId', { eventId: event.organizer.id })
      .getExists();

    return mapToEventDTO(event, isSubscribed);
  }

  async getOne(eventId: string, userId: string): Promise<EventResponseDto> {
    const key = `${CACHE_KEYS.event(eventId)}:${userId}`;
    const cached = await this.cache.get<EventResponseDto>(key);
    if (cached) return cached;

    const { raw, entities } = await this.eventsRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.organizer', 'organizer')
      .loadRelationCountAndMap('event.participantsCount', 'event.participants')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from('event_participants', 'ep')
          .where('ep.event_id = event.id')
          .andWhere('ep.user_id = :userId');
      }, 'event_isSubscribed')
      .where('event.id = :eventId', { eventId })
      .setParameter('userId', userId)
      .getRawAndEntities();

    const event = entities[0];
    const rawRow = raw[0] as {
      event_participantsCount: number;
      isSubscribed: number;
    };

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const result: EventResponseDto = {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      category: event.category ?? null,
      coverUrl: event.coverUrl ?? null,
      onlineUrl: event.onlineUrl ?? null,
      organizer: {
        id: event.organizer.id,
        username: event.organizer.username,
        avatar: event.organizer.avatarUrl,
        nickname: event.organizer.nickname,
      },
      participantsCount: Number(rawRow.event_participantsCount),
      isSubscribed: Boolean(rawRow.isSubscribed),
      createdAt: event.createdAt,
    };

    await this.cache.set(key, result, 120);
    return result;
  }

  async subscribe(eventId: string, userId: string) {
    const alreadySubscribed = await this.eventsRepo
      .createQueryBuilder('event')
      .innerJoin('event.participants', 'user', 'user.id = :userId', { userId })
      .where('event.id = :eventId', { eventId })
      .getExists();

    if (alreadySubscribed) return;

    await this.eventsRepo
      .createQueryBuilder()
      .relation(Event, 'participants')
      .of(eventId)
      .add(userId);

    await this.eventsRepo.increment({ id: eventId }, 'participantsCount', 1);

    await Promise.all([
      this.cache.delByPattern(`event:${eventId}:*`),
      this.cache.del(CACHE_KEYS.eventCount(eventId)),
    ]);
  }

  async unsubscribe(eventId: string, userId: string) {
    await this.eventsRepo
      .createQueryBuilder()
      .relation(Event, 'participants')
      .of(eventId)
      .remove(userId);

    await this.eventsRepo.decrement({ id: eventId }, 'participantsCount', 1);

    await Promise.all([
      this.cache.delByPattern(`event:${eventId}:*`),
      this.cache.del(CACHE_KEYS.eventCount(eventId)),
    ]);
  }

  async getParticipantsCount(eventId: string) {
    const key = CACHE_KEYS.eventCount(eventId);
    const cached = await this.cache.get<number>(key);
    if (cached !== null) return cached;

    const event = await this.eventsRepo.findOne({
      where: { id: eventId },
      select: { participantsCount: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.cache.set(key, event.participantsCount, 60);
    return event.participantsCount;
  }

  async getParticipantsCursor(
    eventId: string,
    { pageSize = 10, cursor }: { pageSize?: number; cursor?: string } = {},
  ): Promise<PaginatedResponse<EventParticipant> & { totalCount: number }> {
    const eventExists = await this.eventsRepo.exists({
      where: { id: eventId },
    });

    if (!eventExists) {
      throw new NotFoundException('Event not found');
    }

    const participants = await this.userRepo
      .createQueryBuilder('participant')
      .select([
        'participant.id AS id',
        'participant.avatarUrl AS avatar',
        'participant.username AS username',
        'participant.nickname AS nickname',
      ])
      .innerJoin(
        'participant.participatingEvents',
        'event',
        'event.id = :eventId',
        { eventId },
      )
      .where(cursor ? 'participant.id > :cursor' : '1=1', { cursor })
      .orderBy('participant.id', 'ASC')
      .limit(pageSize + 1)
      .getRawMany<EventParticipant>();

    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items: participants,
      cursorField: 'id',
      limit: pageSize,
    });

    const totalCount = await this.userRepo
      .createQueryBuilder('participant')
      .innerJoin(
        'participant.participatingEvents',
        'event',
        'event.id = :eventId',
        { eventId },
      )
      .getCount();

    return {
      items: resultItems,
      hasMore,
      nextCursor,
      totalCount: Number(totalCount),
    };
  }
}
