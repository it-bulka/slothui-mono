import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserContactInformation } from '@/widgets/UserRightSidebar/ui/UserContactInformation/UserContactInformation'

const mockContacts = [
  { avatarSrc: 'https://i.pravatar.cc/150?img=1', username: 'alice_dev', nickname: 'Alice Johnson' },
  { avatarSrc: 'https://i.pravatar.cc/150?img=2', username: 'bob_smith', nickname: 'Bob Smith' },
]

const meta: Meta<typeof UserContactInformation> = {
  title: 'Widgets/UserRightSidebar/UserContactInformation',
  component: UserContactInformation,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UserContactInformation>

export const Default: Story = {
  args: { contacts: mockContacts },
}

export const SingleContact: Story = {
  args: { contacts: [mockContacts[0]] },
}

export const NoAvatar: Story = {
  args: {
    contacts: [{ avatarSrc: null, username: 'no_avatar', nickname: 'No Avatar User' }],
  },
}

export const Empty: Story = {
  args: { contacts: [] },
}
