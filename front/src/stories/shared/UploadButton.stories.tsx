import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadButton } from '@/shared/ui/UploadButton/ui/UploadButton'
import { Upload } from 'lucide-react'

const meta: Meta<typeof UploadButton> = {
  title: 'Shared/UploadButton',
  component: UploadButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UploadButton>

export const Default: Story = {
  args: {
    Icon: Upload,
    accept: 'image/*',
    onFilesSelect: () => {},
    children: 'Upload',
  },
}

export const Multiple: Story = {
  args: {
    Icon: Upload,
    accept: 'image/*',
    onFilesSelect: () => {},
    children: 'Upload files',
    multiple: true,
  },
}
