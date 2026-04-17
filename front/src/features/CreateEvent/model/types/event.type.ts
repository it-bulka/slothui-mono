import type { EventCategory } from '@/shared/libs/services/eventsService/events.type'

export type DraftEvent = {
  title: string
  description: string
  isOnline: boolean
  onlineUrl?: string
  locationName?: string
  latitude?: number
  longitude?: number
  date: Date
  category?: EventCategory
}