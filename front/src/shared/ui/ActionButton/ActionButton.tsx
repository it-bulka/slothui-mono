import { type PropsWithChildren, type FunctionComponent, type SVGProps, type MouseEvent, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import cls from './ActionButton.module.css'
import classnames from 'classnames';

interface ActionButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: (event: MouseEvent) => void;
}

export const ActionButton = forwardRef<HTMLButtonElement, PropsWithChildren<ActionButtonProps>>(({ children, Icon, className, onClick, variant = 'primary' }, ref) => {
  return (
    <button className={twMerge(classnames(cls.btn, cls[variant]), className)} onClick={onClick} ref={ref}>
      <Icon className={classnames(cls.icon, cls[variant])}/>
      <span>{children}</span>
    </button>
  )
})