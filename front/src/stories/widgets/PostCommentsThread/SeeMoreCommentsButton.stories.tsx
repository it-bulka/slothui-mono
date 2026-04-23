import type { Meta, StoryObj } from '@storybook/react-vite'
import { SeeMoreCommentsButton } from '@/widgets/PostCommentsThread/ui/SeeMoreCommentsButton/SeeMoreCommentsButton'

const meta: Meta<typeof SeeMoreCommentsButton> = {
  title: 'Widgets/PostCommentsThread/SeeMoreCommentsButton',
  component: SeeMoreCommentsButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
}
export default meta
type Story = StoryObj<typeof SeeMoreCommentsButton>

export const Default: Story = {
  args: { onClick: () => {} },
}
