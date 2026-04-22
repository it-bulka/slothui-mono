import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '@/shared/ui/Stack/Flex/Flex'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'

const meta: Meta<typeof Flex> = {
  title: 'Shared/Stack',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    justify: { control: 'select', options: ['start', 'center', 'end', 'between'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    direction: { control: 'radio', options: ['row', 'column'] },
    gap: { control: 'radio', options: ['10', '20'] },
    max: { control: 'boolean' },
  },
}
export default meta

const Box = ({ label }: { label: string }) => (
  <div className="w-16 h-16 bg-blue-b4 border border-blue-b2 rounded-xl flex items-center justify-center text-sm text-blue-b1">{label}</div>
)

export const FlexRow: StoryObj<typeof Flex> = {
  args: { direction: 'row', gap: '20', children: <><Box label="A" /><Box label="B" /><Box label="C" /></> },
}

export const FlexColumn: StoryObj<typeof Flex> = {
  args: { direction: 'column', gap: '10', children: <><Box label="A" /><Box label="B" /><Box label="C" /></> },
}

export const HStackStory: StoryObj<typeof HStack> = {
  name: 'HStack',
  render: () => (
    <HStack gap="20">
      <Box label="A" /><Box label="B" /><Box label="C" />
    </HStack>
  ),
}

export const VStackStory: StoryObj<typeof VStack> = {
  name: 'VStack',
  render: () => (
    <VStack gap="10">
      <Box label="A" /><Box label="B" /><Box label="C" />
    </VStack>
  ),
}
