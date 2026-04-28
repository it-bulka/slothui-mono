import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarInfoCard } from '@/widgets/UserRightSidebar/ui/SidebarInfoCard'
import { Typography, TypographyTypes } from '@/shared/ui'

const meta: Meta<typeof SidebarInfoCard> = {
  title: 'Widgets/UserRightSidebar/SidebarInfoCard',
  component: SidebarInfoCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof SidebarInfoCard>

export const About: Story = {
  args: {
    title: 'About',
    children: (
      <Typography type={TypographyTypes.P_SM}>
        Frontend developer passionate about UX and clean code.
      </Typography>
    ),
  },
}

export const AboutEmpty: Story = {
  args: {
    title: 'About',
    children: (
      <Typography type={TypographyTypes.P_SM} className="text-gray-g2">
        No information about this user yet
      </Typography>
    ),
  },
}

export const ContactInformation: Story = {
  args: {
    title: 'Contact Information',
    children: <Typography type={TypographyTypes.P_SM}>john_doe</Typography>,
  },
}
