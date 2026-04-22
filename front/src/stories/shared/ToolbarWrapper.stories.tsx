import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToolbarWrapper } from '@/shared/ui/ToolbarWrapper/ui/ToolbarWrapper'

const meta: Meta<typeof ToolbarWrapper> = {
  title: 'Shared/ToolbarWrapper',
  component: ToolbarWrapper,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ToolbarWrapper>

export const Default: Story = {
  render: () => (
    <ToolbarWrapper>
      <span className="font-semibold">Page Title</span>
    </ToolbarWrapper>
  ),
}

export const WithActions: Story = {
  render: () => (
    <ToolbarWrapper className="flex justify-between items-center">
      <span className="font-semibold">Feed</span>
      <button className="btn-soft text-sm">New Post</button>
    </ToolbarWrapper>
  ),
}
