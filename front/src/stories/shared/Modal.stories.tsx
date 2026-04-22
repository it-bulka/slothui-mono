import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from '@/shared/ui/Modal/ui/Modal'
import { Button } from '@/shared/ui/Button/Button'

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Modal Title</h2>
            <p className="text-gray-g1 mb-4">Modal body content goes here.</p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Modal>
      </>
    )
  },
}

export const TopLeft: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Top-Left Modal</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} position="top left">
          <div className="p-4">
            <p>Top-left positioned modal</p>
            <Button onClick={() => setOpen(false)} variant="secondary" className="mt-2">Close</Button>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithRenderProp: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal (render prop)</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          {(close) => (
            <div className="p-6">
              <p className="mb-4">Close via render prop:</p>
              <Button onClick={close}>Close from inside</Button>
            </div>
          )}
        </Modal>
      </>
    )
  },
}
