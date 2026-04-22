import type { Meta, StoryObj } from '@storybook/react-vite'
import { SharedInfo } from '@/entities/Message/ui/SharedInfo/SharedInfo'

const meta: Meta<typeof SharedInfo> = {
  title: 'Entities/Message/SharedInfo',
  component: SharedInfo,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof SharedInfo>

export const WithLabel: Story = {
  args: { children: 'Shared post' },
}

export const WithoutLabel: Story = {
  args: {},
}
