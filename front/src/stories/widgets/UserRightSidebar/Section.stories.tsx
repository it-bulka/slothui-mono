import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section } from '@/widgets/UserRightSidebar/ui/Section'

const meta: Meta<typeof Section> = {
  title: 'Widgets/UserRightSidebar/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Section>

export const Default: Story = {
  args: {
    title: 'About Me',
    children: <p className="text-sm">Frontend developer passionate about UX and clean code.</p>,
  },
}

export const WithRichContent: Story = {
  args: {
    title: 'Skills',
    children: (
      <ul className="text-sm space-y-1">
        <li>React, TypeScript</li>
        <li>Node.js, NestJS</li>
        <li>CSS, Tailwind</li>
      </ul>
    ),
  },
}
