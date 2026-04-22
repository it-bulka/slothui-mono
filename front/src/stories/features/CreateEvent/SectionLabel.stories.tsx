import type { Meta, StoryObj } from '@storybook/react-vite'
import { SectionLabel } from '@/features/CreateEvent/ui/CreateEventForm/SectionLabel'

const meta: Meta<typeof SectionLabel> = {
  title: 'Features/CreateEvent/SectionLabel',
  component: SectionLabel,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof SectionLabel>

export const Default: Story = {
  args: { children: 'Event Title' },
}

export const Category: Story = {
  args: { children: 'Category' },
}

export const Location: Story = {
  args: { children: 'Location' },
}
