import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import cls from './ProgressBar.module.css'
import { type RefObject } from 'react';

type HorizontalProgress = {
  direction?: 'horizontal';
  position: 'top' | 'bottom';
}

type VerticalProgress = {
  direction: 'vertical';
  position?: 'right' | 'left';
}

type ProgressType = HorizontalProgress | VerticalProgress
type ProgressBarProps = {
  isPaused?: boolean
  refProgress?: RefObject<HTMLDivElement | null>
} & ProgressType

export const ProgressBar = ({
  direction = 'horizontal',
  position = direction === 'horizontal' ? 'top' : 'left',
  isPaused = false,
  refProgress
}: ProgressBarProps) => {
  return (
    <div
      className={twMerge(classnames(
        cls.bar,
        { [cls.static]: isPaused },
        [cls[direction], cls[position]]
      ))}>

      <div
        ref={refProgress}
        className={twMerge(classnames(cls.inner, [cls.progress]))}
      />
    </div>
  )
}