import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { NavbarLink } from '@/widgets/NavBar/NavbarLink'
import FeedSvg from '@/shared/assets/images/sidebar/1.feed.svg?react'
import FriendsSvg from '@/shared/assets/images/sidebar/3.friends.svg?react'

const meta: Meta<typeof NavbarLink> = {
  title: 'Widgets/NavBar/NavbarLink',
  component: NavbarLink,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><ul><Story /></ul></MemoryRouter>],
  argTypes: {
    title: { control: 'text' },
    count: { control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof NavbarLink>

export const Default: Story = {
  args: { title: 'Feed', href: '/', Icon: FeedSvg },
}

export const WithBadge: Story = {
  args: { title: 'Friends', href: '/friends', Icon: FriendsSvg, count: 3 },
}

export const ZeroBadge: Story = {
  args: { title: 'Friends', href: '/friends', Icon: FriendsSvg, count: 0 },
}
