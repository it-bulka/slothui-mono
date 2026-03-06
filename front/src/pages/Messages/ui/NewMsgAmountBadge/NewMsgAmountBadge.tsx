import { Badge } from '@/shared/ui'
import DownArrow from '@/shared/assets/images/message/down-arrow.svg?react'
import cls from './NewMsgAmountBadge.module.css'
import classnames from 'classnames'
import { twMerge } from 'tailwind-merge';

interface NewMsgAmountBadgeProps {
  amount?: number
  isVisible?: boolean
  onClick?: () => void
  className?: string
}

export const NewMsgAmountBadge = ({
  amount = 0,
  isVisible = false,
  onClick,
  className
}: NewMsgAmountBadgeProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(classnames(cls.badge, {
        [cls.visible]: isVisible
      }, [className]))}
    >
      {amount > 0 && <Badge>{amount}</Badge>}
      <DownArrow className="w-[18px] h-[18px]" />
    </button>
  )
}