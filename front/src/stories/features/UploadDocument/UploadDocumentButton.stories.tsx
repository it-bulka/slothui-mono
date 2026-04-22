import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadDocumentButton } from '@/features/UploadDocument/ui/UploadDocumentButton/UploadDocumentButton'

const meta: Meta<typeof UploadDocumentButton> = {
  title: 'Features/UploadDocument/UploadDocumentButton',
  component: UploadDocumentButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UploadDocumentButton>

export const Default: Story = {
  args: { onFilesSelect: () => {} },
}
