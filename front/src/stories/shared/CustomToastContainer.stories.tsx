import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CustomToastContainer } from '@/shared/ui/CustomToastContainer/ui/CustomToastContainer/CustomToastContainer'
import { toast } from 'react-toastify'
import { Button } from '@/shared/ui/Button/Button'

const meta: Meta<typeof CustomToastContainer> = {
  title: 'Shared/CustomToastContainer',
  component: CustomToastContainer,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CustomToastContainer>

export const Default: Story = {
  render: () => (
    <div>
      <CustomToastContainer />
      <div className="flex gap-2">
        <Button onClick={() => toast.success('Saved successfully!')}>Success</Button>
        <Button variant="secondary" onClick={() => toast.error('Something went wrong')}>Error</Button>
        <Button variant="transparent" onClick={() => toast.info('New notification')}>Info</Button>
      </div>
    </div>
  ),
}
