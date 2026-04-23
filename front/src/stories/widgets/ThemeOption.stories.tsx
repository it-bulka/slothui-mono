import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeOption } from '@/widgets/ThemeSelect/ThemeOption'
import SunSvg from '@/shared/assets/images/theme/sun.svg?react'
import MoonSvg from '@/shared/assets/images/theme/moon.svg?react'

const meta: Meta<typeof ThemeOption> = {
  title: 'Widgets/ThemeSelect/ThemeOption',
  component: ThemeOption,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    className: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof ThemeOption>

export const Light: Story = {
  args: { title: 'Light', Icon: SunSvg, className: 'text-amber-400' },
}

export const Dark: Story = {
  args: { title: 'Dark', Icon: MoonSvg, className: 'text-dark' },
}
