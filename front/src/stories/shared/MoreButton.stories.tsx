import type { Meta, StoryObj } from '@storybook/react-vite'
import { MoreButton } from '@/shared/ui/MoreButton/ui/MoreButton'

const meta: Meta<typeof MoreButton> = {
  title: 'Shared/MoreButton',
  component: MoreButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof MoreButton>

export const Default: Story = {
  args: {
    content: (
      <div className="popup-menu min-w-[160px]">
        <button className="popup-menu-item">Edit</button>
        <button className="popup-menu-item text-red-600 dark:text-red-400">Delete</button>
      </div>
    ),
  },
}
