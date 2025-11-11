import { type PropsWithChildren, type FunctionComponent, type SVGProps, type MouseEvent, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import cls from './ActionButton.module.css'
import classnames from 'classnames';

export interface ActionButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: (event: MouseEvent) => void;
  column?: boolean
}

export const ActionButton = forwardRef<HTMLButtonElement, PropsWithChildren<ActionButtonProps>>(({ children, Icon, className, onClick, variant = 'primary', column = false }, ref) => {
  return (
    <button className={twMerge(classnames(cls.btn, cls[variant], { "flex-col": column}), className)} onClick={onClick} ref={ref}>
      <Icon className={classnames(cls.icon, cls[variant])}/>
      {children && <span>{children}</span>}
    </button>
  )
})