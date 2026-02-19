import { memo, type ReactNode, type MouseEventHandler } from 'react'
import { Avatar, Card, Typography, TypographyTypes, AppLink } from '@/shared/ui'
import AvatarDefault from '@/shared/assets/images/default/avatar-default.png'
import { getEventsDetailsPage } from '@/shared/config';
import { useNavigate, Link } from 'react-router';

export interface EventCardProps {
  id: string
  title: string
  description: string
  date: string
  location?: string
  organizer: {
    username: string
    avatar?: string
  }
  profileLink?: string
  participantsCount?: number
  onClick?: (id: string) => void
  actions?: ReactNode,
}

export const EventCard = memo(({
  id,
  title,
  description,
  date,
  location,
  organizer,
  participantsCount = 0,
  onClick,
  actions,
  profileLink
}: EventCardProps) => {
  const navigate = useNavigate()
  const onAvatarClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation()
    navigate(getEventsDetailsPage(id))
  }
  return (
    <Card
      onClick={() => {
        onClick?.(id)
        navigate(getEventsDetailsPage(id))
      }}
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <Card.Header className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2 relative">
          {profileLink && (
            <Link
              to={profileLink}
              onClick={onAvatarClick}
              className={'absolute top-0 left-0 right-0 bottom-0'}
            />
          )}

          <Avatar src={organizer.avatar || AvatarDefault} name={organizer.username} size="sm" />
          <Typography bold>{organizer.username}</Typography>
        </div>
        <Typography type={TypographyTypes.BLOCK_TITLE} className="text-gray-400">{date}</Typography>
      </Card.Header>

      <Card.Body className="pt-4 pb-2">
        <Typography type={TypographyTypes.BLOCK_TITLE} bold className="mb-1">{title}</Typography>
        <Typography className="line-clamp-3">
          {description}
        </Typography>

        {location && (
          <Typography type={TypographyTypes.BLOCK_TITLE}  className="mt-2">
            {location}
          </Typography>
        )}

        <AppLink to={getEventsDetailsPage(id)}>See more...</AppLink>
      </Card.Body>

      <Card.Footer className="flex items-center justify-between pt-3 border-t border-gray-100">
        <Typography type={TypographyTypes.BLOCK_TITLE}>
          {participantsCount} participations
        </Typography>

        {actions}
      </Card.Footer>
    </Card>
  )
})

EventCard.displayName = 'EventCard'
