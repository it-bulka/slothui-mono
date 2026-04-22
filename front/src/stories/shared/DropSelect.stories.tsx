import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropSelect } from '@/shared/ui/DropSelect/DropSelect'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
]

const meta: Meta<typeof DropSelect> = {
  title: 'Shared/DropSelect',
  component: DropSelect,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DropSelect>

export const Default: Story = {
  args: { options, placeholder: 'Select framework...' },
}

export const WithDefault: Story = {
  args: { options, defaultValue: options[0] },
}
