import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioInput } from '@/shared/ui/RadioInput/RadioInput'

const meta: Meta<typeof RadioInput> = {
  title: 'Shared/RadioInput',
  component: RadioInput,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof RadioInput>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('a')
    return (
      <div className="flex flex-col gap-2">
        <RadioInput name="group" selected={selected === 'a'} onChange={() => setSelected('a')}>Option A</RadioInput>
        <RadioInput name="group" selected={selected === 'b'} onChange={() => setSelected('b')}>Option B</RadioInput>
        <RadioInput name="group" selected={selected === 'c'} onChange={() => setSelected('c')}>Option C</RadioInput>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <RadioInput name="disabled" selected={false} disabled>Disabled option</RadioInput>
  ),
}
