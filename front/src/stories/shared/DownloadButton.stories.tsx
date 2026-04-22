import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadButton } from '@/shared/ui/DownloadButton/ui/DownloadButton'

const meta: Meta<typeof DownloadButton> = {
  title: 'Shared/DownloadButton',
  component: DownloadButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DownloadButton>

export const Default: Story = {
  args: {
    publicId: 'sample_file',
    url: 'https://example.com/file.pdf',
    filename: 'document.pdf',
  },
}
