import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShareOnInstagram } from '@/features/ShareOnSocialMedia/ui/ShareOnInstagramButton/ShareOnInstagramButton'

const meta: Meta<typeof ShareOnInstagram> = {
  title: 'Features/ShareOnSocialMedia/ShareOnInstagramButton',
  component: ShareOnInstagram,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ShareOnInstagram>

export const Default: Story = {
  args: { url: 'https://example.com/post/123' },
}
