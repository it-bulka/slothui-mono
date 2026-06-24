import { Link, type LinkProps } from 'react-router'
import { twMerge } from 'tailwind-merge';

interface AppLinkProps extends LinkProps {
  className?: string
  noArrow?: boolean
}

export const AppLink = ({ children, to, className, noArrow = false }: AppLinkProps) => {
  return (
    <Link to={to} className={twMerge("inline-flex items-center gap-1.5 text-blue-b1 font-medium transition-colors hover:text-blue-b2 group", className)}>
      <span>{children}</span>
      {noArrow || (
        <svg
          className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </Link>
  )
}