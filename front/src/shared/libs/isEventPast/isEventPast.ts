export const startOfToday = (): Date => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export const isEventPast = (dateIso: string, today: Date): boolean =>
  new Date(dateIso) < today
