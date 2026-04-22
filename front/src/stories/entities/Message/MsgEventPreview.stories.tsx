import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { MsgEventPreview } from '@/entities/Message/ui/content/EventMessage/MsgEventPreview'

const meta: Meta<typeof MsgEventPreview> = {
  title: 'Entities/Message/MsgEventPreview',
  component: MsgEventPreview,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof MsgEventPreview>

export const Default: Story = {
  args: {
    id: 'evt-1',
    title: 'Tech Meetup Kyiv',
    description: 'A community gathering for developers. Join us for talks, networking, and free pizza.',
    date: 'Apr 28, 2026',
    location: 'Kyiv, Podil',
  },
}

export const NoLocation: Story = {
  args: {
    id: 'evt-2',
    title: 'Online React Workshop',
    description: 'Deep dive into React 19 concurrent features and the new compiler.',
    date: 'May 3, 2026',
  },
}
