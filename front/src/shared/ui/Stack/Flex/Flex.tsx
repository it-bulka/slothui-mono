import {
  type ReactNode, memo, type HTMLAttributes
} from 'react'
import classNames from 'classnames'

import cls from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch'
export type FlexDirection = 'row' | 'column'
export type FlexGap = '10' | '20'

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween
}

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
  stretch: cls.alignStretch
}

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn
}

const gapClasses: Record<FlexGap, string> = {
  10: cls.gap10,
  20: cls.gap20,
}

type DivProps = HTMLAttributes<HTMLDivElement>

export interface FlexProps extends DivProps {
  className?: string
  children: ReactNode
  justify?: FlexJustify
  align?: FlexAlign
  direction?: FlexDirection
  gap?: FlexGap
  max?: boolean
  wrap?: boolean
}

export const Flex = memo(({
                            className,
                            children,
                            justify = 'start',
                            align = 'center',
                            direction = 'row',
                            gap,
                            max = false,
                            wrap = false,
                            ...rest
}: FlexProps) => {
  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap]
  ]

  const mods = {
    [cls.max]: max,
    [cls.wrap]: wrap
  }
  return (
    <div className={classNames(cls.flex, mods, classes)} {...rest}>
      {children}
    </div>
  )
})

Flex.displayName = 'Flex'
