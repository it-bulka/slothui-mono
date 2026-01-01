export const formatDate = (
  iso: string,
  options?: Intl.DateTimeFormatOptions
) => {
  return new Intl.DateTimeFormat(
    undefined, // locale  auto
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    }
  ).format(new Date(iso))
}