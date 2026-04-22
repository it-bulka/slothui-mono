import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClearDraftButton } from '@/features/DraftMessage/ui/ClearDraftButton/ClearDraftButton'

const meta: Meta<typeof ClearDraftButton> = {
  title: 'Features/DraftMessage/ClearDraftButton',
  component: ClearDraftButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative w-32 h-12 bg-gray-100 rounded-xl">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof ClearDraftButton>

export const Default: Story = {
  args: { onClick: () => {} },
}
