import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/shared/ui/Button/Button'

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'icon', 'transparent', 'link'] },
    size: { control: 'radio', options: ['normal', 'md'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Button', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Button', variant: 'secondary' },
}

export const Transparent: Story = {
  args: { children: 'Button', variant: 'transparent' },
}

export const Link: Story = {
  args: { children: 'Button', variant: 'link' },
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}

export const FullWidth: Story = {
  args: { children: 'Full Width', fullWidth: true },
}
