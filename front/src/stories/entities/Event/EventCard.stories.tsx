import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { EventCard } from '@/entities/Event/ui/EventCard/EventCard'

const meta: Meta<typeof EventCard> = {
  title: 'Entities/Event/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof EventCard>

const baseArgs = {
  id: 'evt-1',
  title: 'Tech Meetup Kyiv',
  description: 'A community gathering for developers to share ideas, network, and learn about the latest trends in web and mobile development.',
  date: 'Apr 28, 2026',
  organizer: { username: 'john_doe', avatar: 'https://i.pravatar.cc/150?img=1' },
  participantsCount: 48,
}

export const Default: Story = {
  args: baseArgs,
}

export const WithLocation: Story = {
  args: {
    ...baseArgs,
    location: 'Kyiv, Podil',
  },
}

export const Online: Story = {
  args: {
    ...baseArgs,
    title: 'Remote React Workshop',
    onlineUrl: 'https://meet.example.com/react-workshop',
  },
}

export const WithCover: Story = {
  args: {
    ...baseArgs,
    coverUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop',
  },
}

export const WithCategory: Story = {
  args: {
    ...baseArgs,
    category: 'music',
  },
}

export const WithActions: Story = {
  args: {
    ...baseArgs,
    actions: <button className="btn-soft text-sm">Join</button>,
  },
}
