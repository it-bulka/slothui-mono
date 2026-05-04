import { memo } from 'react'
import classnames from 'classnames'
import cls from './Overlay.module.css'

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      role="button"
      tabIndex={0}
      aria-label="Close"
      className={classnames(cls.overlay, {}, [className])}
    />
  )
})
