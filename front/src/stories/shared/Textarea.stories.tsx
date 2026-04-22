import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/shared/ui/Textarea/ui/Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    return <Textarea {...args} value={value} onChange={e => setValue(e.target.value)} />
  },
  args: { placeholder: 'Write something...' },
}

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    return <Textarea {...args} value={value} onChange={e => setValue(e.target.value)} />
  },
  args: { placeholder: 'Write something...', error: 'This field is required' },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState('Some initial text content here.')
    return <Textarea value={value} onChange={e => setValue(e.target.value)} rows={4} />
  },
}
