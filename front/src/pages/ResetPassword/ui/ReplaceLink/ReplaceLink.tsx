import { useNavigate } from 'react-router';
import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export const ReplaceLink = ({ to, children }: PropsWithChildren<{ to: string}>) => {
  const navigate = useNavigate()

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault()
        navigate(to, { replace: true })
      }}
      className={twMerge("inline-flex items-center gap-2 text-blue-b1")}
    >
      {children}
    </a>
  )
}