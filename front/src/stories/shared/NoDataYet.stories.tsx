import type { Meta, StoryObj } from '@storybook/react-vite'
import { NoDataYet } from '@/shared/ui/NoDataYet/NoDataYet'
import noEventsImage from '@/shared/assets/images/general/no_events_2.png'
import noPostsImage from '@/shared/assets/images/general/no_posts_2.png'

const meta: Meta<typeof NoDataYet> = {
  title: 'Shared/NoDataYet',
  component: NoDataYet,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    buttonLabel: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof NoDataYet>

export const NoEvents: Story = {
  args: {
    image: noEventsImage,
    title: 'No any event yet',
    subtitle: "This user hasn't created any events yet",
    buttonLabel: "Explore other users' events",
    onButtonClick: () => {},
  },
}

export const NoPosts: Story = {
  args: {
    image: noPostsImage,
    title: 'No any posts yet',
    subtitle: "This user hasn't created any posts yet",
    buttonLabel: "Explore other users' posts",
    onButtonClick: () => {},
  },
}

export const NoEventsOwn: Story = {
  args: {
    image: noEventsImage,
    title: 'No any event yet',
    subtitle: "You haven't created any events yet",
    buttonLabel: 'Create first event',
    onButtonClick: () => {},
  },
}

export const WithoutButton: Story = {
  args: {
    image: noPostsImage,
    title: 'No any posts yet',
    subtitle: 'No posts have been created yet',
  },
}
