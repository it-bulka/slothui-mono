import type { Meta, StoryObj } from '@storybook/react-vite'
import { AudioList } from '@/features/DraftMessage/ui/AudioList/AudioList'

const mockAudioFile = (name: string, size: number) => ({
  id: name,
  tempUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  file: { name, size } as File,
})

const meta: Meta<typeof AudioList> = {
  title: 'Features/DraftMessage/AudioList',
  component: AudioList,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AudioList>

export const Single: Story = {
  args: {
    list: [mockAudioFile('voice-message.mp3', 512000)],
    onDelete: () => {},
  },
}

export const Multiple: Story = {
  args: {
    list: [
      mockAudioFile('voice-1.mp3', 204800),
      mockAudioFile('voice-2.mp3', 409600),
      mockAudioFile('background-music.mp3', 1048576),
    ],
    onDelete: () => {},
  },
}

export const Empty: Story = {
  args: { list: [], onDelete: () => {} },
}
