import type { ReactNode } from 'react'
import { Typography } from '@/shared/ui'

interface SectionLabelProps {
  children: ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <Typography variant="h4" bold className="text-xs uppercase tracking-widest text-gray-g2 mb-2">
      {children}
    </Typography>
  )
}
