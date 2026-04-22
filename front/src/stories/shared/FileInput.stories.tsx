import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileInput } from '@/shared/ui/FileIput/FileInput'

const meta: Meta<typeof FileInput> = {
  title: 'Shared/FileInput',
  component: FileInput,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof FileInput>

export const Default: Story = {
  args: { name: 'file', title: 'Choose file', onChange: () => {} },
}

export const ImageOnly: Story = {
  args: { name: 'avatar', title: 'Upload avatar', accept: 'image/*', label: 'Profile photo', onChange: () => {} },
}

export const WithSizeLimit: Story = {
  args: { name: 'photo', title: 'Upload photo', accept: 'image/*', maxFiles: 3, maxFileSizeMB: 5, onChange: () => {} },
}

export const WithError: Story = {
  args: { name: 'file', title: 'Choose file', error: 'File is required', onChange: () => {} },
}
