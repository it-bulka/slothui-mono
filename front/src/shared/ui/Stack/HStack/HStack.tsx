import { Flex, type FlexProps } from '../Flex/Flex'
import { memo } from 'react'

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = memo(({ className, children, ...rest }: HStackProps) => {
  return (
    <Flex className={className} direction="row" {...rest}>
      {children}
    </Flex>
  )
})

HStack.displayName = 'HStack'
