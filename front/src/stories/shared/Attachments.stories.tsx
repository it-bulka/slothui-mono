import type { Meta, StoryObj } from '@storybook/react-vite'
import { AttachmentList } from '@/shared/ui/Attachments/ui/groups/AttachmentList/AttachmentList'
import { MediaGrid } from '@/shared/ui/Attachments/ui/groups/MediaGrid/MediaGrid'

const mockImages = [
  { id: '1', type: 'images' as const, url: 'https://picsum.photos/seed/a/400/300', publicId: 'a', metadata: null },
  { id: '2', type: 'images' as const, url: 'https://picsum.photos/seed/b/400/300', publicId: 'b', metadata: null },
  { id: '3', type: 'images' as const, url: 'https://picsum.photos/seed/c/400/300', publicId: 'c', metadata: null },
  { id: '4', type: 'images' as const, url: 'https://picsum.photos/seed/d/400/300', publicId: 'd', metadata: null },
  { id: '5', type: 'images' as const, url: 'https://picsum.photos/seed/e/400/300', publicId: 'e', metadata: null },
]

const meta: Meta = {
  title: 'Shared/Attachments',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const MediaGridStory: Story = {
  name: 'MediaGrid',
  render: () => <MediaGrid list={mockImages} />,
}

export const AttachmentListStory: Story = {
  name: 'AttachmentList',
  render: () => (
    <AttachmentList
      list={['Document A.pdf', 'Report.docx', 'Spreadsheet.xlsx', 'Presentation.pptx', 'Notes.txt']}
      renderItem={(item) => (
        <div key={item} className="flex items-center gap-2 py-2 px-3 border-b border-gray-g3 text-sm">
          📄 {item}
        </div>
      )}
      limit={3}
    />
  ),
}
