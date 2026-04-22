import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatActionsMenu } from '@/features/DeleteChat/ui/ChatActionsMenu/ChatActionsMenu'

const meta: Meta<typeof ChatActionsMenu> = {
  title: 'Features/DeleteChat/ChatActionsMenu',
  component: ChatActionsMenu,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ChatActionsMenu>

export const Default: Story = {
  args: { onDelete: () => {} },
}
