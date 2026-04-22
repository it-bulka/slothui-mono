import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocsList } from '@/features/DraftMessage/ui/DocsList/DocsList'

const mockDoc = (name: string, size: number) => ({
  id: name,
  tempUrl: 'https://example.com/file.pdf',
  file: { name, size } as File,
})

const meta: Meta<typeof DocsList> = {
  title: 'Features/DraftMessage/DocsList',
  component: DocsList,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DocsList>

export const Single: Story = {
  args: {
    docs: [mockDoc('report.pdf', 204800)],
    onDelete: () => {},
  },
}

export const Multiple: Story = {
  args: {
    docs: [
      mockDoc('invoice.pdf', 102400),
      mockDoc('contract.docx', 307200),
      mockDoc('presentation.pptx', 2097152),
    ],
    onDelete: () => {},
  },
}

export const Empty: Story = {
  args: { docs: [], onDelete: () => {} },
}
