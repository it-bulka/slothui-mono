import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchBar } from '@/shared/ui/SearchBar/SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Shared/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['md', 'lg'] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
  },
}
export default meta
type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    return <SearchBar {...args} value={value} onChange={setValue} />
  },
  args: { placeholder: 'Search...' },
}

export const IconRight: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    return <SearchBar {...args} value={value} onChange={setValue} />
  },
  args: { placeholder: 'Search...', iconPosition: 'right' },
}

export const Large: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    return <SearchBar {...args} value={value} onChange={setValue} />
  },
  args: { placeholder: 'Search people...', size: 'lg' },
}
