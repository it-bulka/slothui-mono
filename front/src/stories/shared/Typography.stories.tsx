import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types'

const meta: Meta<typeof Typography> = {
  title: 'Shared/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: Object.values(TypographyTypes) },
    color: { control: 'radio', options: ['primary', 'secondary', 'error'] },
    bold: { control: 'boolean' },
    center: { control: 'boolean' },
    variant: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] },
  },
}
export default meta
type Story = StoryObj<typeof Typography>

export const Title: Story = {
  args: { children: 'Page Title', type: TypographyTypes.TITLE, variant: 'h1' },
}

export const BlockTitle: Story = {
  args: { children: 'Block Title', type: TypographyTypes.BLOCK_TITLE, variant: 'h2' },
}

export const Paragraph: Story = {
  args: { children: 'Regular paragraph text. Used for body content across the app.', type: TypographyTypes.P },
}

export const ParagraphSmall: Story = {
  args: { children: 'Small paragraph. Used for hints and captions.', type: TypographyTypes.P_SM },
}

export const Subtitle: Story = {
  args: { children: 'Subtitle text', type: TypographyTypes.SUBTITLE },
}

export const Secondary: Story = {
  args: { children: 'Secondary color text', type: TypographyTypes.P, color: 'secondary' },
}

export const Error: Story = {
  args: { children: 'Error message text', type: TypographyTypes.P, color: 'error' },
}

export const Bold: Story = {
  args: { children: 'Bold text', type: TypographyTypes.P, bold: true },
}
