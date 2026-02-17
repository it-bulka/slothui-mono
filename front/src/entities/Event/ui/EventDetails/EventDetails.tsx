import { Avatar, Typography, TypographyTypes } from '@/shared/ui';
import AvatarDefault from '@/shared/assets/images/default/avatar-default.png';
import { MapView } from '@/entities';

interface EventDetailsProps {
  id: string
  title: string
  description: string
  date: string
  location?: string
  position: [number, number] | null;
  organizer: {
    username: string
    avatar?: string
  }
}
export const EventDetails = ({
  organizer,
  date,
  title,
  location,
  position,
  description
}: EventDetailsProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Avatar src={organizer.avatar || AvatarDefault} name={organizer.username} size="sm" />
        <Typography bold>{organizer.username}</Typography>
      </div>
      <Typography type={TypographyTypes.BLOCK_TITLE} className="text-gray-400">{date}</Typography>

      <Typography type={TypographyTypes.BLOCK_TITLE} bold className="mb-1">{title}</Typography>
      <Typography className="line-clamp-3">
        {description}
      </Typography>

      {location && (
        <Typography type={TypographyTypes.BLOCK_TITLE}  className="mt-2">
          {location}
        </Typography>
      )}

      {position && (
        <MapView locationName={location} position={position}/>
      )}
    </>
  )
}