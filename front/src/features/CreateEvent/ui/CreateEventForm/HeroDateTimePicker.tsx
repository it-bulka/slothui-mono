import { memo, useMemo } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { HeroPill } from './HeroPill'

export interface HeroDateTimePickerProps {
  value: Date
  onChange: (date: Date) => void
  minDate: Date
}

const CalendarIcon = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export const HeroDateTimePicker = memo(({ value, onChange, minDate }: HeroDateTimePickerProps) => {
  const dateOnly = useMemo(() => {
    const d = new Date(value)
    d.setHours(0, 0, 0, 0)
    return d
  }, [value])

  const timeOnly = useMemo(() => {
    const t = new Date(value)
    t.setFullYear(1970, 0, 1)
    return t
  }, [value])

  const handleDateChange = (d: Date | null) => {
    if (!d) return
    const combined = new Date(value)
    combined.setFullYear(d.getFullYear(), d.getMonth(), d.getDate())
    onChange(combined)
  }

  const handleTimeChange = (t: Date | null) => {
    if (!t) return
    const combined = new Date(value)
    combined.setHours(t.getHours(), t.getMinutes(), 0, 0)
    onChange(combined)
  }

  return (
    <div className="flex items-center gap-1.5">
      <DatePicker
        selected={dateOnly}
        onChange={handleDateChange}
        dateFormat="dd MMM yyyy"
        minDate={minDate}
        customInput={<HeroPill icon={CalendarIcon} />}
        popperProps={{ strategy: 'fixed' }}
      />
      <DatePicker
        selected={timeOnly}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="HH:mm"
        customInput={<HeroPill icon={ClockIcon} />}
        popperProps={{ strategy: 'fixed' }}
      />
    </div>
  )
})
HeroDateTimePicker.displayName = 'HeroDateTimePicker'
