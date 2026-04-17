import { memo } from 'react'
import { EventCategory } from '@/shared/libs/services/eventsService/events.type'
import { getCategoryConfig } from '@/entities/Event/lib/categoryConfig'
import { SectionLabel } from './SectionLabel'

const ALL_CATEGORIES = Object.values(EventCategory)

/* ─── Tile ─────────────────────────────────────────────────── */

interface CategoryTileProps {
  category: EventCategory
  selected: boolean
  onSelect: (c: EventCategory) => void
}

const CategoryTile = memo(({ category, selected, onSelect }: CategoryTileProps) => {
  const config = getCategoryConfig(category)
  const label  = config.label.replace(' Event', '')

  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      aria-pressed={selected}
      title={config.label}
      className={[
        'relative overflow-hidden rounded-xl py-1.5 px-1',
        'flex flex-col items-center gap-1 cursor-pointer',
        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
        selected
          ? 'ring-2 ring-white/70 scale-[1.06] shadow-lg'
          : 'opacity-55 hover:opacity-85 hover:scale-[1.03]',
      ].join(' ')}
      style={{ background: config.gradientCss }}
    >
      <span className="text-base leading-none">{config.emoji}</span>
      <span className="text-[9px] font-semibold text-[rgba(255,255,255,0.9)] tracking-wide">{label}</span>

      {selected && (
        <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white/30 flex items-center justify-center">
          <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  )
})
CategoryTile.displayName = 'CategoryTile'

/* ─── Picker ────────────────────────────────────────────────── */

export interface CategoryPickerProps {
  value: EventCategory | undefined
  onChange: (category: EventCategory | undefined) => void
}

export const CategoryPicker = memo(({ value, onChange }: CategoryPickerProps) => {
  const handleSelect = (cat: EventCategory) => {
    onChange(value === cat ? undefined : cat)
  }

  return (
    <div className="mb-5">
      <SectionLabel>Category</SectionLabel>
      <div className="grid grid-cols-6 gap-1.5">
        {ALL_CATEGORIES.map((cat) => (
          <CategoryTile
            key={cat}
            category={cat}
            selected={value === cat}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
})
CategoryPicker.displayName = 'CategoryPicker'
