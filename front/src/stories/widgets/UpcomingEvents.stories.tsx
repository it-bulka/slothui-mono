import type { Meta, StoryObj } from '@storybook/react-vite'
import { UpcomingEvents } from '@/widgets/UpcomingEvents/UpcomingEvents'
import { withReduxAndRouter } from './_storyHelpers'
import { EventCategory, type EventDTO } from '@/shared/libs/services/eventsService/events.type'

const mockEvents: EventDTO[] = [
  {
    id: 'upcoming-1',
    title: 'React Conf 2025',
    description: 'Annual React developer conference with workshops and talks.',
    date: '2025-09-15T10:00:00Z',
    location: 'Kyiv, Ukraine',
    category: EventCategory.BUSINESS,
    coverUrl: null,
    onlineUrl: null,
    organizer: { id: 'u-1', username: 'alice_dev', nickname: 'Alice Dev', avatar: 'https://i.pravatar.cc/150?img=1' },
    participantsCount: 120,
    isSubscribed: true,
  },
  {
    id: 'upcoming-2',
    title: 'Music Festival Kyiv',
    description: 'Monthly community music festival in the city centre.',
    date: '2025-10-01T18:00:00Z',
    location: 'Lviv',
    category: EventCategory.MUSIC,
    coverUrl: null,
    onlineUrl: null,
    organizer: { id: 'u-2', username: 'bob_music', nickname: 'Bob Music', avatar: 'https://i.pravatar.cc/150?img=2' },
    participantsCount: 45,
    isSubscribed: false,
  },
  {
    id: 'upcoming-3',
    title: 'Web Dev Summit Online',
    description: 'Global virtual summit for web developers.',
    date: '2025-11-20T14:00:00Z',
    location: undefined,
    category: EventCategory.BUSINESS,
    coverUrl: null,
    onlineUrl: 'https://example.com/summit',
    organizer: { id: 'u-3', username: 'carol_cto', nickname: 'Carol', avatar: 'https://i.pravatar.cc/150?img=3' },
    participantsCount: 500,
    isSubscribed: true,
  },
  {
    id: 'upcoming-4',
    title: 'City Marathon 2025',
    description: 'Annual city marathon for all skill levels.',
    date: '2025-12-05T08:00:00Z',
    location: 'Odesa',
    category: EventCategory.SPORT,
    coverUrl: null,
    onlineUrl: null,
    organizer: { id: 'u-4', username: 'run_coach', nickname: 'Coach Run', avatar: 'https://i.pravatar.cc/150?img=5' },
    participantsCount: 800,
    isSubscribed: true,
  },
]

// hasMore: false prevents the thunk from firing in story env (no real services)
const makeEventsState = (events: EventDTO[], isLoading = false) => ({
  ids: events.map(e => e.id),
  entities: Object.fromEntries(events.map(e => [e.id, e])),
  upcoming: {
    ids: events.map(e => e.id),
    isLoading,
    hasMore: false,
    nextCursor: null,
    lastFetchedCursor: null,
  },
  home:       { ids: [], isLoading: false, hasMore: true, nextCursor: null },
  subscribed: { ids: [], isLoading: false, hasMore: true, nextCursor: null },
  liked:      { ids: [], isLoading: false, hasMore: true, nextCursor: null },
  saved:      { ids: [], isLoading: false, hasMore: true, nextCursor: null },
  eventsByUser: {},
  participants: {},
})

const meta: Meta<typeof UpcomingEvents> = {
  title: 'Widgets/UpcomingEvents',
  component: UpcomingEvents,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UpcomingEvents>

export const Default: Story = {
  decorators: [withReduxAndRouter({ events: makeEventsState(mockEvents.slice(0, 2)) })],
  render: () => (
    <div className="w-80">
      <UpcomingEvents />
    </div>
  ),
}

export const ManyEvents: Story = {
  decorators: [withReduxAndRouter({ events: makeEventsState(mockEvents) })],
  render: () => (
    <div className="w-80">
      <UpcomingEvents />
    </div>
  ),
}

export const Empty: Story = {
  decorators: [withReduxAndRouter({ events: makeEventsState([]) })],
  render: () => (
    <div className="w-80">
      <UpcomingEvents />
    </div>
  ),
}
