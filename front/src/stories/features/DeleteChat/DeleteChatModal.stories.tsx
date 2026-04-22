import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeleteChatModal } from '@/features/DeleteChat/ui/DeleteChatModal/DeleteChatModal'

const meta: Meta<typeof DeleteChatModal> = {
  title: 'Features/DeleteChat/DeleteChatModal',
  component: DeleteChatModal,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DeleteChatModal>

export const Open: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true)
    return (
      <>
        <button className="btn-soft" onClick={() => setIsOpen(true)}>Open Modal</button>
        <DeleteChatModal
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </>
    )
  },
}
