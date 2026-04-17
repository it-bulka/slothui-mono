export enum EventCategory {
  MUSIC    = 'music',
  SPORT    = 'sport',
  BUSINESS = 'business',
  DATING   = 'dating',
  TRAVEL   = 'travel',
  PARTY    = 'party',
}

export interface EventParticipant {
  id: string;
  avatar?: string;
  username: string;
  nickname: string;
}

export interface EventDTO {
  id: string
  title: string
  description: string
  date: string
  location?: string
  category?: EventCategory | null
  coverUrl?: string | null
  onlineUrl?: string | null
  organizer: {
    id: string;
    avatar?: string;
    username: string;
    nickname: string;
  }
  participantsCount: number
  // participants?: EventParticipant[]
  isSubscribed?: boolean,
}

export interface CreateEventDTO {
  title: string
  description: string
  isOnline: boolean
  onlineUrl?: string
  location?: {
    address?: string
    latitude: number
    longitude: number
  }
  date: string // ISO
  category?: EventCategory
}