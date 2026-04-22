import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkBlock } from '@/shared/ui/LinkBlock/LinkBlock'
import { MemoryRouter } from 'react-router'

const meta: Meta<typeof LinkBlock> = {
  title: 'Shared/LinkBlock',
  component: LinkBlock,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof LinkBlock>

export const Default: Story = {
  args: {
    links: [
      { to: '/home', label: 'Home' },
      { to: '/friends', label: 'Friends' },
      { to: '/messages', label: 'Messages' },
    ],
  },
}

export const NoArrows: Story = {
  args: {
    links: [
      { to: '/home', label: 'Home' },
      { to: '/settings', label: 'Settings' },
    ],
    noArrow: true,
  },
}
