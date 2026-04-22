import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadAudioButton } from '@/features/UploadAudio/ui/UploadAudioButton/UploadAudioButton'

const meta: Meta<typeof UploadAudioButton> = {
  title: 'Features/UploadAudio/UploadAudioButton',
  component: UploadAudioButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UploadAudioButton>

export const Default: Story = {
  args: { onFilesSelect: () => {} },
}
