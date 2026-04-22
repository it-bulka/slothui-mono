import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeleteMediaBtn } from '@/features/DraftMessage/ui/MediaGrid/DeleteMediaBtn'

const meta: Meta<typeof DeleteMediaBtn> = {
  title: 'Features/DraftMessage/DeleteMediaBtn',
  component: DeleteMediaBtn,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative w-20 h-20 bg-gray-300 rounded-xl">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof DeleteMediaBtn>

export const Default: Story = {
  args: { itemId: 'img-1', onDelete: () => {} },
}

export const NoCallback: Story = {
  args: { itemId: 'img-2' },
}
