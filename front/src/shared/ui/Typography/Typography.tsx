import type { FC, ReactElement, ReactNode } from 'react'
import classnames from 'classnames'
import cls from './Typography.module.css'
import { twMerge } from 'tailwind-merge';
import { TypographyTypes, type TagType, type HeadingType, type ParagraphType, type SpanType } from './typography.types.ts';

export type TypographyProps = (HeadingType | ParagraphType | SpanType) & {
  className?: string
  variant?: TagType
  children: ReactNode | ReactElement
  type?: TypographyTypes
  color?: 'primary' | 'secondary'
  center?: boolean
  bold?: boolean
}
export const Typography: FC<TypographyProps> = ({
  className,
  variant = 'p',
  type = TypographyTypes.P,
  color = 'primary',
  center = false,
  bold = false,
  children,
  ...props
}) => {
  const CustomTag = variant as TagType
  return (
    <CustomTag
      className={twMerge(classnames('break-words sm:break-normal',
        [cls[type], cls[color]],
        {
          [cls.center]: center,
          [cls.bold]: bold,
        }),
        className)}
      {...props}
    >
      {children}
    </CustomTag>
  )
}
