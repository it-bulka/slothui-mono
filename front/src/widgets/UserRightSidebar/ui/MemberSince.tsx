import { CalendarIcon } from '@/shared/assets/icons/CalendarIcon'
import { formatDate } from '@/shared/libs/formatDate'
import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types'

export const MemberSince = ({ createdAt }: { createdAt: string }) => {
  const formatted = formatDate(createdAt, {
    year: 'numeric',
    month: 'long',
    day: undefined,
    hour: undefined,
    minute: undefined,
  })

  return (
    <div className="flex items-center gap-2 text-gray-g2 px-1 py-2">
      <span className="text-gray-g2 flex-shrink-0">{CalendarIcon}</span>
      <Typography type={TypographyTypes.P_SM}>Member since {formatted}</Typography>
    </div>
  )
}
