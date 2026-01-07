import { Typography } from '@/shared/ui';
import { EventsList } from '@/widgets';
import type { EventsContentType } from '../../model/types/eventOption.type.ts';
import { useEventsByTypeSelect } from '../../model/hooks/useEventsByTypeSelect.tsx';
import { useInfiniteScroll } from '@/shared/hooks';
import { useRef } from 'react';
import { useLoadMoreEvents } from '../../model/hooks/useLoadMoreEvents.tsx';

interface EventCategoryContentProps {
  userId: string;
  type: EventsContentType;
}

export const EventCategoryContent = ({ userId, type }: EventCategoryContentProps) => {
  const { items: events, isLoading, hasMore, nextCursor } = useEventsByTypeSelect(userId, type);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { loadMore } = useLoadMoreEvents()

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    isLoading,
    hasMore: !!hasMore,
    onLoadMore: () => loadMore({ userId, type, nextCursor }),
  });

  if (!events?.length) return <Typography bold>No any event yet</Typography>;

  return (
    <div ref={wrapperRef} className="overflow-auto space-y-4">
      <EventsList events={events} withActions={type !== 'your'} />
      <div ref={triggerRef} />
    </div>
  )
};
