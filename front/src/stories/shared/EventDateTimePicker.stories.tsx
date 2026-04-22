import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventDateTimePicker } from '@/shared/ui/EventDateTimePicker/ui/EventDateTimePicker/EventDateTimePicker'

const meta: Meta<typeof EventDateTimePicker> = {
  title: 'Shared/EventDateTimePicker',
  component: EventDateTimePicker,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof EventDateTimePicker>

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState(new Date())
    return <EventDateTimePicker value={date} onChange={setDate} />
  },
}

export const WithMinDate: Story = {
  render: () => {
    const [date, setDate] = React.useState(new Date())
    return <EventDateTimePicker value={date} onChange={setDate} minDate={new Date()} />
  },
}
