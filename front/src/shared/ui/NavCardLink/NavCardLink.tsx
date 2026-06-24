import { memo } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface NavCardLinkProps {
  to: string
  title: string
  description: string
  className?: string
}

export const NavCardLink = memo(({ to, title, description, className }: NavCardLinkProps) => (
  <Link to={to} className={twMerge('settings-card group', className)}>
    <div className="flex-1">
      <p className="font-bold text-dark">{title}</p>
      <p className="text-sm text-gray-g1 mt-1">{description}</p>
    </div>
    <svg
      className="w-5 h-5 text-gray-g2 group-hover:text-blue-b1 transition-colors shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </Link>
))

NavCardLink.displayName = 'NavCardLink'
