import { EventCategory } from '../enums/event-category.enum';

export interface EventParticipant {
  id: string;
  avatar: string;
  username: string;
}

export type EventParticipants = {
  eventId: string;
  participantsCount?: number;
  participants?: EventParticipant[];
};

export type Location = {
  address?: string;
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
};

export interface EventResponseDto {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: Location | null;
  category?: EventCategory | null;
  coverUrl?: string | null;
  onlineUrl?: string | null;
  organizer: {
    id: string;
    username: string;
    nickname: string;
    avatar?: string | null;
  };
  participantsCount?: number;
  isSubscribed?: boolean;
  createdAt: string;
}

export type CreatedEvent = Omit<EventResponseDto, 'organizer' | 'isSubscribed'>;
