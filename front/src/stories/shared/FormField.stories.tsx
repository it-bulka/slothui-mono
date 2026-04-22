import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from '@/shared/ui/FormField/ui/FormField'

const meta: Meta<typeof FormField> = {
  title: 'Shared/FormField',
  component: FormField,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  render: () => (
    <FormField label="Username">
      <input className="w-full bg-transparent outline-none" placeholder="john_doe" />
    </FormField>
  ),
}

export const WithError: Story = {
  render: () => (
    <FormField label="Email" error="Invalid email address">
      <input className="w-full bg-transparent outline-none" placeholder="user@example.com" />
    </FormField>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <FormField label="Bio">
      <textarea className="w-full bg-transparent outline-none resize-none" rows={3} placeholder="Tell about yourself..." />
    </FormField>
  ),
}
