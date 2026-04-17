import { type ReactNode } from 'react'
import { Avatar, Typography, TypographyTypes } from '@/shared/ui';
import AvatarDefault from '@/shared/assets/images/default/avatar-default.png';
import { MapView } from '@/entities';
import { getCategoryConfig } from '../../lib/categoryConfig'
import type { EventCategory } from '@/shared/libs/services/eventsService/events.type'

interface EventDetailsProps {
  id: string
  title: string
  description: string
  date: string
  location?: string
  position: [number, number] | null
  category?: EventCategory | null
  coverUrl?: string | null
  onlineUrl?: string | null
  participantsCount?: number
  organizer: {
    username: string
    avatar?: string
  }
  actions?: ReactNode
}

function MetaBadge({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-light-l1 text-sm text-gray-g1">
      {icon}
      <span>{children}</span>
    </div>
  )
}

export const EventDetails = ({
  organizer,
  date,
  title,
  location,
  position,
  description,
  category,
  coverUrl,
  onlineUrl,
  participantsCount,
  actions,
}: EventDetailsProps) => {
  const categoryConfig = getCategoryConfig(category)

  return (
    <article className="space-y-4">

      {/* Hero block */}
      <section className="rounded-3xl overflow-hidden bg-light-l2 border border-gray-g3">

        {/* Cover image / gradient */}
        <div className="relative h-56 sm:h-72">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: categoryConfig.gradientCss }}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />

          {/* Organizer + date overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
            <Avatar src={organizer.avatar || AvatarDefault} name={organizer.username} size="md" />
            <div>
              <Typography bold className="text-[#fff]">{organizer.username}</Typography>
              <Typography type={TypographyTypes.P_SM} className="text-[rgba(255,255,255,0.7)]">{date}</Typography>
            </div>
          </div>

          {/* Category emoji — bottom right when no cover */}
          {!coverUrl && (
            <span className="absolute bottom-4 right-4 text-4xl opacity-50 z-10 pointer-events-none">
              {categoryConfig.emoji}
            </span>
          )}
        </div>

        {/* Content panel */}
        <div className="p-5 space-y-4">
          <Typography variant="h2" bold className="text-xl sm:text-2xl">
            {title}
          </Typography>

          <Typography className="text-gray-g1 leading-relaxed opacity-80">
            {description}
          </Typography>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-2">
            <MetaBadge
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              }
            >
              {date}
            </MetaBadge>

            {location && (
              <MetaBadge
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                }
              >
                {location}
              </MetaBadge>
            )}

            {onlineUrl && (
              <MetaBadge
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                }
              >
                Online
              </MetaBadge>
            )}
          </div>

          {participantsCount !== undefined && (
            <MetaBadge
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              }
            >
              {participantsCount} participants
            </MetaBadge>
          )}

          {/* Actions row */}
          <div className="flex items-center gap-3 flex-wrap">
            {onlineUrl && (
              <a
                href={onlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-b1 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Join Online
              </a>
            )}
            {actions}
          </div>
        </div>
      </section>

      {/* Map */}
      {position && (
        <section className="rounded-3xl overflow-hidden border border-gray-g3">
          <MapView locationName={location} position={position} />
        </section>
      )}

    </article>
  )
}
