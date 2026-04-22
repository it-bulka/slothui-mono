import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActionButton } from '@/shared/ui/ActionButton/ui/ActionButton'
import { Heart, Star, Share2 } from 'lucide-react'

const meta: Meta<typeof ActionButton> = {
  title: 'Shared/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
    isActive: { control: 'boolean' },
    column: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof ActionButton>

export const Default: Story = {
  args: { Icon: Heart, children: '12' },
}

export const Active: Story = {
  args: { Icon: Heart, children: '12', isActive: true },
}

export const WithoutLabel: Story = {
  args: { Icon: Star },
}

export const Column: Story = {
  args: { Icon: Share2, children: 'Share', column: true },
}

export const Secondary: Story = {
  args: { Icon: Heart, children: 'Like', variant: 'secondary' },
}
