import { Flex, type FlexProps } from '../Flex/Flex'
import { memo } from 'react'

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = memo(({ className, children, ...rest }: VStackProps) => {
  return (
    <Flex className={className} direction="column" {...rest}>
      {children}
    </Flex>
  )
})

VStack.displayName = 'VStack'
