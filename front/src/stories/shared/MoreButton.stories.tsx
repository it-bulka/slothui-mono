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
      <div className="bg-underground-primary border border-gray-g3 rounded-xl shadow-theme p-2 flex flex-col gap-1">
        <button className="btn-ghost px-3 py-2 text-sm text-left w-full">Edit</button>
        <button className="btn-ghost px-3 py-2 text-sm text-left w-full">Delete</button>
      </div>
    ),
  },
}
