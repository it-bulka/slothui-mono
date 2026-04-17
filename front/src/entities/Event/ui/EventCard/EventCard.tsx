import { memo, type ReactNode, type MouseEventHandler } from 'react'
import { Avatar, Card, Typography, TypographyTypes, AppLink } from '@/shared/ui'
import AvatarDefault from '@/shared/assets/images/default/avatar-default.png'
import { getEventsDetailsPage } from '@/shared/config';
import { useNavigate, Link } from 'react-router';
import { getCategoryConfig } from '../../lib/categoryConfig'
import type { EventCategory } from '@/shared/libs/services/eventsService/events.type'

export interface EventCardProps {
  id: string
  title: string
  description: string
  date: string
  location?: string
  category?: EventCategory | null
  coverUrl?: string | null
  onlineUrl?: string | null
  organizer: {
    username: string
    avatar?: string
  }
  profileLink?: string
  participantsCount?: number
  onClick?: (id: string) => void
  actions?: ReactNode
}

export const EventCard = memo(({
  id,
  title,
  description,
  date,
  location,
  category,
  coverUrl,
  onlineUrl,
  organizer,
  participantsCount = 0,
  onClick,
  actions,
  profileLink
}: EventCardProps) => {
  const navigate = useNavigate()
  const categoryConfig = getCategoryConfig(category)

  const onAvatarClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation()
  }

  return (
    <Card
      onClick={() => {
        onClick?.(id)
        navigate(getEventsDetailsPage(id))
      }}
      className="cursor-pointer overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Hero section */}
      <div className="relative h-36 overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ background: categoryConfig.gradientCss }}
          />
        )}

        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Organizer — top left */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          {profileLink ? (
            <Link to={profileLink} onClick={onAvatarClick} className="flex items-center gap-2">
              <Avatar src={organizer.avatar || AvatarDefault} name={organizer.username} size="sm" />
              <Typography bold className="text-[#fff] text-sm drop-shadow">{organizer.username}</Typography>
            </Link>
          ) : (
            <>
              <Avatar src={organizer.avatar || AvatarDefault} name={organizer.username} size="sm" />
              <Typography bold className="text-[#fff] text-sm drop-shadow">{organizer.username}</Typography>
            </>
          )}
        </div>

        {/* Date badge — top right */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
          <Typography type={TypographyTypes.P_SM} className="text-[rgba(255,255,255,0.9)]">{date}</Typography>
        </div>

        {/* Title + category emoji — bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 bg-gradient-to-t from-black/75 to-transparent z-10">
          <Typography
            variant="h3"
            bold
            className="text-[#fff] line-clamp-1 drop-shadow-[0_0_18px_rgba(59,130,246,.3)]"
          >
            {title}
          </Typography>
        </div>

        {/* Category emoji — bottom right (only when no cover image) */}
        {!coverUrl && (
          <span className="absolute bottom-3 right-4 text-2xl opacity-50 z-10 pointer-events-none">
            {categoryConfig.emoji}
          </span>
        )}
      </div>

      {/* Body */}
      <Card.Body className="pt-3 pb-3 space-y-3">
        <Typography type={TypographyTypes.P_SM} className="line-clamp-2 text-gray-g1 opacity-80">
          {description}
        </Typography>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 text-xs text-gray-g1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {date}
          </span>
          {onlineUrl ? (
            <a
              href={onlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-blue-b1 hover:underline"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Online
            </a>
          ) : location ? (
            <span className="flex items-center gap-1.5 text-xs text-gray-g1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {location}
            </span>
          ) : null}
          <span className="flex items-center gap-1.5 text-xs text-gray-g1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            {participantsCount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <AppLink to={getEventsDetailsPage(id)}>See details</AppLink>
          {actions}
        </div>
      </Card.Body>
    </Card>
  )
})

EventCard.displayName = 'EventCard'
