import { Typography, TypographyTypes } from '@/shared/ui';
import { Link } from 'react-router';
import { getEventsDetailsPage } from '@/shared/config';
import ArrowSide from '@/shared/assets/images/general/arrow-up-right.svg?react'

export interface MsgEventPreviewProps {
  description: string;
  title: string;
  location?: string;
  date?: string;
  id: string
}
export const MsgEventPreview = ({
  description, title, location, date, id
}: MsgEventPreviewProps) => {
  return (
    <Link className="msg-extra" to={getEventsDetailsPage(id)}>
      <div className="flex justify-between gap-2">
        <Typography type={TypographyTypes.BLOCK_TITLE} className="text-gray-400">{date}</Typography>
        <ArrowSide />
      </div>
      <Typography type={TypographyTypes.BLOCK_TITLE} bold className="mb-1">{title}</Typography>
      <Typography className="line-clamp-3">
        {description}
      </Typography>

      {location && (
        <Typography type={TypographyTypes.BLOCK_TITLE}  className="mt-2">
          {location}
        </Typography>
      )}
    </Link>
  )
}