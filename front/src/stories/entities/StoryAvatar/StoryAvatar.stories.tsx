import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryAvatar } from '@/entities/StoryAvatar/StoryAvatar'

const meta: Meta<typeof StoryAvatar> = {
  title: 'Entities/StoryAvatar/StoryAvatar',
  component: StoryAvatar,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
}
export default meta
type Story = StoryObj<typeof StoryAvatar>

export const WithUsername: Story = {
  args: {
    avatarSrc: 'https://i.pravatar.cc/150?img=1',
    username: 'alice_dev',
  },
}

export const WithoutUsername: Story = {
  args: {
    avatarSrc: 'https://i.pravatar.cc/150?img=2',
  },
}

export const WithFallback: Story = {
  args: {
    avatarSrc: '',
    username: 'broken_img',
  },
}

export const LongUsername: Story = {
  args: {
    avatarSrc: 'https://i.pravatar.cc/150?img=5',
    username: 'very_long_username_here',
  },
}
