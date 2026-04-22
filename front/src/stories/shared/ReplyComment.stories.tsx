import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActionButton } from '@/shared/ui/ActionButton/ui/ActionButton'
import CommentSvg from '@/shared/assets/images/post/comment.svg?react'
import CloseSvg from '@/shared/assets/images/actions/close.svg?react'

/**
 * ReplyComment is a Redux-connected widget. Stories show its two visual states
 * using its underlying ActionButton directly.
 */
const meta: Meta = {
  title: 'Shared/ReplyComment',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const ReplyAction: Story = {
  render: () => <ActionButton Icon={CommentSvg} />,
}

export const CancelReply: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-blue-b1 py-2">
      <span>Replying to <b>@jane_doe...</b></span>
      <ActionButton Icon={CloseSvg} onClick={() => {}} />
    </div>
  ),
}
