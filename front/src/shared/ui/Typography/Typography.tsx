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
}
export const Typography: FC<TypographyProps> = ({
  className,
  variant = 'p',
  type = TypographyTypes.P,
  color = 'primary',
  children,
  ...props
}) => {
  const CustomTag = variant as TagType
  return (
    <CustomTag className={twMerge(classnames('break-words sm:break-normal', [cls[type], cls[color]]), className)} {...props}>
      {children}
    </CustomTag>
  )
}
