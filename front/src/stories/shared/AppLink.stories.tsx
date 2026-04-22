import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { MemoryRouter } from 'react-router'

const meta: Meta<typeof AppLink> = {
  title: 'Shared/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    noArrow: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof AppLink>

export const Default: Story = {
  args: { to: '/profile', children: 'View Profile' },
}

export const NoArrow: Story = {
  args: { to: '/settings', children: 'Settings', noArrow: true },
}
