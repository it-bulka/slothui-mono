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

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepo: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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
        'event.participantsCount AS participantsCount',
        'event.createdAt AS createdAt',
        `json_build_object(
           'id', organizer.id,
           'username', organizer.username,
           'nickname', organizer.nickname,
           'avatar', organizer.avatar
         ) AS organizer`,
        'TRUE AS "isSubscribed"',
      ])
      .where('participant.id = :userId', { userId })
      .andWhere(cursor ? 'event.date < :cursor' : '1=1', { cursor })
      .orderBy('event.date', 'DESC')
      .limit(pageSize + 1)
      .getRawMany<EventResponseDto>();

    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items: events,
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
    { pageSize = 10, cursor }: { pageSize?: number; cursor?: string } = {},
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
        'event.participantsCount AS participantsCount',
        'event.createdAt AS createdAt',
        `json_build_object(
           'id', organizer.id,
           'username', organizer.username,
           'avatar', organizer."avatarUrl"
         ) AS organizer`,
      ])
      .where('organizer.id = :userId', { userId });

    if (cursor) {
      qb.andWhere('event.date < :cursor', { cursor });
    }

    qb.orderBy('event.date', 'DESC').limit(pageSize + 1);

    const events = await qb.getRawMany<EventResponseDto>();
    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items: events,
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

    // isSubscribed:
    const isSubscribed = await this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.participatingEvents', 'event')
      .where('user.id = :userId', { userId: event.organizer.id })
      .andWhere('event.id = :eventId', { eventId: event.organizer.id })
      .getExists();

    return mapToEventDTO(event, isSubscribed);
  }

  async getOne(eventId: string, userId: string): Promise<EventResponseDto> {
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

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
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
  }

  async subscribe(eventId: string, userId: string) {
    await this.eventsRepo
      .createQueryBuilder()
      .relation(Event, 'participants')
      .of(eventId)
      .add(userId);

    await this.eventsRepo.increment({ id: eventId }, 'participantsCount', 1);
  }

  async unsubscribe(eventId: string, userId: string) {
    await this.eventsRepo
      .createQueryBuilder()
      .relation(Event, 'participants')
      .of(eventId)
      .remove(userId);

    await this.eventsRepo.decrement({ id: eventId }, 'participantsCount', 1);
  }

  async getParticipantsCount(eventId: string) {
    const event = await this.eventsRepo.findOne({
      where: { id: eventId },
      select: { participantsCount: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

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
