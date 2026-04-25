import { memo, useEffect, useMemo } from 'react';
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx';
import { useFetchUpcomingEvents, useUpcomingEventsSelect } from '@/entities/Event/model/hooks';
import { UpcomingEventItem } from './UpcomingEventItem';

const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export const UpcomingEvents = memo(() => {
  const { fetchUpcomingEvents } = useFetchUpcomingEvents();
  const { items, isLoading } = useUpcomingEventsSelect();

  useEffect(() => {
    fetchUpcomingEvents({ cursor: null });
  }, [fetchUpcomingEvents]);

  const displayed = useMemo(() => {
    if (items.length <= 2) return items;
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [items]);

  return (
    <div>
      <BlockTitle title="Upcoming Events" withMargin />

      {!isLoading && displayed.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 text-gray-g1">
          <span className="opacity-30"><CalendarIcon /></span>
          <p className="text-sm font-medium">No upcoming events</p>
          <p className="text-xs opacity-70 text-center">Subscribe to events to see them here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {displayed.map((event) => (
            <UpcomingEventItem key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
});

UpcomingEvents.displayName = 'UpcomingEvents';
