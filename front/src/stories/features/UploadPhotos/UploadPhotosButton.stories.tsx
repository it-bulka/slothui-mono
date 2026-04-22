import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadPhotosButton } from '@/features/UploadPhotos/ui/UploadPhotosButton/UploadPhotosButton'

const meta: Meta<typeof UploadPhotosButton> = {
  title: 'Features/UploadPhotos/UploadPhotosButton',
  component: UploadPhotosButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UploadPhotosButton>

export const Default: Story = {
  args: { onFilesSelect: () => {} },
}
