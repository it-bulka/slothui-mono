export interface EventParticipant {
  id: string;
  avatar: string;
  name: string;
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
  organizer: {
    id: string;
    name: string;
    nickname: string;
    avatar?: string | null;
  };
  participantsCount?: number;
  isSubscribed?: boolean;
  createdAt: string;
}

export type CreatedEvent = Omit<EventResponseDto, 'organizer' | 'isSubscribed'>;
