import { memo } from 'react';
import { Link } from 'react-router';
import { Avatar } from '@/shared/ui';
import { getCategoryConfig } from '@/entities/Event/lib/categoryConfig';
import { getEventsDetailsPage } from '@/shared/config';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type';
import AvatarDefault from '@/shared/assets/images/default/avatar-default.png';

interface UpcomingEventItemProps {
  event: EventDTO;
}

export const UpcomingEventItem = memo(({ event }: UpcomingEventItemProps) => {
  const { gradientCss, emoji } = getCategoryConfig(event.category);

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Link
      to={getEventsDetailsPage(event.id)}
      className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-light-l3 border border-transparent hover:border-gray-g3 overflow-hidden"
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
        style={{ background: gradientCss }}
      />

      {/* Mini cover */}
      <div
        className="relative w-10 h-10 rounded-lg shrink-0 flex items-center justify-center overflow-hidden"
        style={{ background: gradientCss }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <span className="relative z-10 text-base leading-none">{emoji}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm line-clamp-1 text-dark-d1 group-hover:text-blue-b1 transition-colors duration-150">
          {event.title}
        </p>

        <div className="flex items-center gap-2.5 mt-0.5 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-gray-g1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {formattedDate}
          </span>

          {event.onlineUrl ? (
            <span className="flex items-center gap-1 text-xs text-blue-b1 font-medium">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Online
            </span>
          ) : event.location ? (
            <span className="flex items-center gap-1 text-xs text-gray-g1 truncate max-w-[90px]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {typeof event.location === 'object' ? event.location?.address : event.location}
            </span>
          ) : null}
        </div>
      </div>

      {/* Organizer avatar */}
      <Avatar
        src={event.organizer.avatar ?? AvatarDefault}
        name={event.organizer.username}
        size="sm"
        className="shrink-0"
      />
    </Link>
  );
});

UpcomingEventItem.displayName = 'UpcomingEventItem';
