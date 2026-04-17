import { forwardRef, type ReactNode } from 'react'

export interface HeroPillProps {
  value?: string
  onClick?: () => void
  icon: ReactNode
}

export const HeroPill = forwardRef<HTMLButtonElement, HeroPillProps>(
  ({ value, onClick, icon }, ref) => (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-sm text-[rgba(255,255,255,0.9)] text-[11px] font-medium hover:bg-black/55 transition-colors cursor-pointer whitespace-nowrap"
    >
      {icon}
      {value || '—'}
    </button>
  ),
)
HeroPill.displayName = 'HeroPill'
