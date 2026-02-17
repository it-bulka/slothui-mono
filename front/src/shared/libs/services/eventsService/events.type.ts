export interface EventParticipant {
  id: string;
  avatar?: string;
  name: string;
  nickname: string;
}

export interface EventDTO {
  id: string
  title: string
  description: string
  date: string
  location?: string
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
  location?: {
    address?: string
    latitude: number
    longitude: number
  }
  date: string // ISO
}