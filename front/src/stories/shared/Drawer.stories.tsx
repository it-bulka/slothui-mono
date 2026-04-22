import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Drawer } from '@/shared/ui/Drawer/ui/Drawer/Drawer'
import { Button } from '@/shared/ui/Button/Button'

const meta: Meta<typeof Drawer> = {
  title: 'Shared/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={open} onClose={() => setOpen(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Drawer Content</h2>
            <p className="text-gray-g1 mb-4">Drag down or click overlay to close.</p>
            <Button onClick={() => setOpen(false)} variant="secondary">Close</Button>
          </div>
        </Drawer>
      </>
    )
  },
}
