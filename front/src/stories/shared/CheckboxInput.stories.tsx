import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckboxInput } from '@/shared/ui/CheckboxInput/CheckboxInput'

const meta: Meta<typeof CheckboxInput> = {
  title: 'Shared/CheckboxInput',
  component: CheckboxInput,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CheckboxInput>

export const Unchecked: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    return <CheckboxInput name="demo" selected={checked} onChange={setChecked}>Accept terms</CheckboxInput>
  },
}

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true)
    return <CheckboxInput name="demo" selected={checked} onChange={setChecked}>Remember me</CheckboxInput>
  },
}

export const Disabled: Story = {
  render: () => (
    <CheckboxInput name="demo" selected={false} disabled>Disabled option</CheckboxInput>
  ),
}
