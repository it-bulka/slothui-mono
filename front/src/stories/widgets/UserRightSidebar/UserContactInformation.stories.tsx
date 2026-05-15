import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserContactInformation } from '@/widgets/UserRightSidebar/ui/UserContactInformation/UserContactInformation'

const meta: Meta<typeof UserContactInformation> = {
  title: 'Widgets/UserRightSidebar/UserContactInformation',
  component: UserContactInformation,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UserContactInformation>

export const Default: Story = {
  args: { userId: 'user-123' },
}
