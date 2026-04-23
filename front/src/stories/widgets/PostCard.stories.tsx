import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostCard } from '@/widgets/PostCard/PostCard'
import { withReduxAndRouter } from './_storyHelpers'
import type { Attachment } from '@/shared/types'

const mockImage: Attachment = {
  id: '1',
  url: 'https://picsum.photos/seed/card1/600/400',
  type: 'images',
  publicId: 'img-1',
  originalName: 'photo.jpg',
  metadata: { size: 120000, format: 'jpg' },
}

const meta: Meta<typeof PostCard> = {
  title: 'Widgets/PostCard',
  component: PostCard,
  tags: ['autodocs'],
  decorators: [withReduxAndRouter()],
}
export default meta
type Story = StoryObj<typeof PostCard>

export const WithAuthor: Story = {
  args: {
    postId: 'post-1',
    text: 'This is a post with an author profile. #coding #react',
    avatarSrc: 'https://i.pravatar.cc/150?img=10',
    userName: 'john_doe',
    userPosition: 'Frontend Developer',
    userId: 'user-1',
    profileLink: '/users/user-1',
  },
}

export const WithImages: Story = {
  args: {
    postId: 'post-2',
    text: 'Check out this beautiful photo!',
    images: [mockImage],
    avatarSrc: 'https://i.pravatar.cc/150?img=11',
    userName: 'jane_smith',
    userPosition: 'Designer',
    userId: 'user-2',
    profileLink: '/users/user-2',
  },
}

export const WithoutAuthor: Story = {
  args: {
    postId: 'post-3',
    text: 'Anonymous post without author info.',
    withOutAuthor: true,
  },
}

export const TextOnly: Story = {
  args: {
    postId: 'post-4',
    text: 'Just a simple text post.\n\nWith multiple paragraphs!\n\n#life #thoughts',
    avatarSrc: undefined,
    userName: 'no_avatar_user',
    userPosition: 'Writer',
    userId: 'user-4',
    profileLink: '/users/user-4',
  },
}
