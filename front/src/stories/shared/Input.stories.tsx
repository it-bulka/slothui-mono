import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/shared/ui/Input/Input'

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    return <Input {...args} value={value} onChange={setValue} />
  },
  args: { placeholder: 'Enter text...' },
}

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    return <Input {...args} value={value} onChange={setValue} />
  },
  args: { label: 'Username', placeholder: 'john_doe' },
}

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    return <Input {...args} value={value} onChange={setValue} />
  },
  args: { label: 'Email', placeholder: 'user@example.com', error: 'Invalid email address' },
}

export const ReadOnly: Story = {
  args: { value: 'Read only value', readOnly: true },
}
