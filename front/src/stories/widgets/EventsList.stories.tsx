import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventsList } from '@/widgets/EventsList/ui/EventsList/EventsList'
import { withReduxAndRouter } from './_storyHelpers'
import { EventCategory, type EventDTO } from '@/shared/libs/services/eventsService/events.type'

const mockEvents: EventDTO[] = [
  {
    id: 'event-1',
    title: 'React Conference 2025',
    description: 'Annual React developer conference with workshops and talks.',
    date: '2025-06-15T10:00:00Z',
    location: 'Kyiv, Ukraine',
    category: EventCategory.BUSINESS,
    coverUrl: 'https://picsum.photos/seed/event1/400/200',
    onlineUrl: 'https://example.com/stream',
    organizer: { id: 'user-1', username: 'alice_dev', nickname: 'Alice Dev', avatar: 'https://i.pravatar.cc/150?img=1' },
    participantsCount: 120,
  },
  {
    id: 'event-2',
    title: 'Music Fest Kyiv',
    description: 'Monthly community music festival.',
    date: '2025-07-01T18:00:00Z',
    location: 'Lviv, Ukraine',
    category: EventCategory.MUSIC,
    coverUrl: 'https://picsum.photos/seed/event2/400/200',
    onlineUrl: null,
    organizer: { id: 'user-2', username: 'bob_music', nickname: 'Bob Music', avatar: 'https://i.pravatar.cc/150?img=2' },
    participantsCount: 45,
  },
]

const meta: Meta<typeof EventsList> = {
  title: 'Widgets/EventsList',
  component: EventsList,
  tags: ['autodocs'],
  decorators: [withReduxAndRouter()],
}
export default meta
type Story = StoryObj<typeof EventsList>

export const Default: Story = {
  args: { events: mockEvents },
}

export const WithActions: Story = {
  args: { events: mockEvents, withActions: true },
}

export const SingleEvent: Story = {
  args: { events: [mockEvents[0]] },
}
