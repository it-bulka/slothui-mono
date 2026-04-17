import { EventCategory } from '@/shared/libs/services/eventsService/events.type'

type CategoryConfig = {
  label: string
  emoji: string
  gradientCss: string
}

const CATEGORY_CONFIG: Record<EventCategory, CategoryConfig> = {
  [EventCategory.MUSIC]: {
    label: 'Music Event',
    emoji: '🎵',
    gradientCss: 'linear-gradient(135deg, #2e1065 0%, #1e3a8a 50%, #312e81 100%)',
  },
  [EventCategory.SPORT]: {
    label: 'Sport Event',
    emoji: '🏃',
    gradientCss: 'linear-gradient(135deg, #14532d 0%, #0f766e 50%, #064e3b 100%)',
  },
  [EventCategory.BUSINESS]: {
    label: 'Business Event',
    emoji: '💼',
    gradientCss: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e293b 100%)',
  },
  [EventCategory.DATING]: {
    label: 'Dating Event',
    emoji: '🍷',
    gradientCss: 'linear-gradient(135deg, #4c0519 0%, #9f1239 50%, #7f1d1d 100%)',
  },
  [EventCategory.TRAVEL]: {
    label: 'Travel Event',
    emoji: '✈️',
    gradientCss: 'linear-gradient(135deg, #0c4a6e 0%, #155e75 50%, #164e63 100%)',
  },
  [EventCategory.PARTY]: {
    label: 'Party Event',
    emoji: '🎉',
    gradientCss: 'linear-gradient(135deg, #7c2d12 0%, #78350f 50%, #92400e 100%)',
  },
}

const DEFAULT_CONFIG: CategoryConfig = {
  label: 'Event',
  emoji: '📅',
  gradientCss: 'linear-gradient(135deg, #312e81 0%, #4338ca 50%, #1e1b4b 100%)',
}

export const getCategoryConfig = (category?: EventCategory | null): CategoryConfig => {
  if (category && CATEGORY_CONFIG[category]) return CATEGORY_CONFIG[category]
  return DEFAULT_CONFIG
}
