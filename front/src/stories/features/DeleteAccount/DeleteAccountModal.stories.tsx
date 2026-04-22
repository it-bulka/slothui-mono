import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeleteAccountModal } from '@/features/DeleteAccount/ui/DeleteAccountModal/DeleteAccountModal'

const meta: Meta<typeof DeleteAccountModal> = {
  title: 'Features/DeleteAccount/DeleteAccountModal',
  component: DeleteAccountModal,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DeleteAccountModal>

export const Open: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true)
    return (
      <>
        <button className="btn-soft" onClick={() => setIsOpen(true)}>Open Modal</button>
        <DeleteAccountModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    )
  },
}
