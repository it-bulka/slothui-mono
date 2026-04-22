import type { Meta, StoryObj } from '@storybook/react-vite'
import { AnonymousTitle } from '@/features/PollView/ui/common/AnonymousTitle'

const meta: Meta<typeof AnonymousTitle> = {
  title: 'Features/PollView/AnonymousTitle',
  component: AnonymousTitle,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AnonymousTitle>

export const Default: Story = {}
