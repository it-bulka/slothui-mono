export type DraftEvent = {
  title: string
  description: string
  isOnline: boolean
  locationName?: string
  latitude?: number
  longitude?: number
  date: Date
}