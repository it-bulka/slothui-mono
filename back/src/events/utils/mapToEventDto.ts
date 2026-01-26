import { EventResponseDto } from '../dto/event.dto';
import { Event } from '../entity/event.entity';

interface OrganizerBase {
  id: string;
  name: string;
  nickname: string;
  avatarUrl?: string | null;
}

export function mapToEventDTO(
  event: Omit<Event, 'organizer'> & {
    organizer: OrganizerBase;
  },
  isSubscribed?: boolean,
): EventResponseDto {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    participantsCount: event.participantsCount,
    isSubscribed,
    organizer: {
      id: event.organizer.id,
      name: event.organizer.name,
      avatar: event.organizer.avatarUrl,
      nickname: event.organizer.nickname,
    },
    createdAt: event.createdAt,
  };
}
