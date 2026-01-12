import { memo, type CSSProperties } from 'react'
import classnames from 'classnames';
import cls from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  border?: string
}

export const Skeleton = memo(({
  className,
  height,
  width,
  border
}: SkeletonProps) => {
  const style: CSSProperties = {
    height,
    width,
    borderRadius: border
  }
  return (
    <div
      className={classnames(cls.skeleton, {}, [className])}
      style={style}
    />
  )
})
