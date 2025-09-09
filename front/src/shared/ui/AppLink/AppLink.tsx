import { Link, type LinkProps } from 'react-router'
import ArrowGoTo from '@/shared/assets/images/general/arrow-up-right.svg?react'
import { twMerge } from 'tailwind-merge';

interface AppLinkProps extends LinkProps {
  className?: string
}

export const AppLink = ({ children, to, className }: AppLinkProps) => {
  return (
    <Link to={to} className={twMerge("inline-flex items-center gap-2 text-blue-b1", className)}>
      <span>{children}</span>
      <ArrowGoTo className="h-5 w-5" />
    </Link>
  )
}