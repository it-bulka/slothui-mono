import type { FunctionComponent, SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface ThemeOptionProps {
  title: string
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  iconClass?: string
  className?: string
}

export const ThemeOption = ({ Icon, title, iconClass, className }: ThemeOptionProps) => {
  return (
    <p className={twMerge("flex items-center", className)}>
      <span className="mx-2">{title}</span>
      <Icon className={twMerge("w-5 h-5", iconClass)}/>
    </p>
  )
}