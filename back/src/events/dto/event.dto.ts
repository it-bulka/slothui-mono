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

export interface EventResponseDto {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string | null;
  organizer: {
    id: string;
    name: string;
    avatar?: string;
  };
  participantsCount?: number;
  isSubscribed?: boolean;
  createdAt: string;
}

export type CreatedEvent = Omit<EventResponseDto, 'organizer' | 'isSubscribed'>;
