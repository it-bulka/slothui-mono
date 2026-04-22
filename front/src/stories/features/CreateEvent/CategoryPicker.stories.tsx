import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CategoryPicker } from '@/features/CreateEvent/ui/CreateEventForm/CategoryPicker'
import type { EventCategory } from '@/shared/libs/services/eventsService/events.type'

const meta: Meta<typeof CategoryPicker> = {
  title: 'Features/CreateEvent/CategoryPicker',
  component: CategoryPicker,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CategoryPicker>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<EventCategory | undefined>(undefined)
    return <CategoryPicker value={value} onChange={setValue} />
  },
}

export const PreSelected: Story = {
  render: () => {
    const [value, setValue] = React.useState<EventCategory | undefined>('music' as EventCategory)
    return <CategoryPicker value={value} onChange={setValue} />
  },
}
