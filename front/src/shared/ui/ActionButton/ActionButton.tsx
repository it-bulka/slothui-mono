import type { PropsWithChildren, FunctionComponent, SVGProps, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import cls from './ActionButton.module.css'
import classnames from 'classnames';

interface ActionButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: (event: MouseEvent) => void;
}

export const ActionButton = ({ children, Icon, className, onClick, variant = 'primary' }: PropsWithChildren<ActionButtonProps>) => {
  return (
    <button className={twMerge(classnames(cls.btn, cls[variant]), className)} onClick={onClick}>
      <Icon className={classnames(cls.icon, cls[variant])}/>
      <span>{children}</span>
    </button>
  )
}