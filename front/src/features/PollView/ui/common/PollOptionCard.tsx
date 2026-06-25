import { memo, type PropsWithChildren } from 'react';
import classNames from 'classnames';
import cls from './PollOptionCard.module.css';

interface PollOptionCardProps {
  isSelected: boolean
  isWinner: boolean
}

export const PollOptionCard = memo(({
  isSelected,
  isWinner,
  children
}: PropsWithChildren<PollOptionCardProps>) => (
  <div className={classNames(cls.card, {
    [cls.selected]: isSelected,
    [cls.winner]: isWinner && !isSelected
  })}>
    {children}
  </div>
))

PollOptionCard.displayName = 'PollOptionCard'
