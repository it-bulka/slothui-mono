import { Typography } from '@/shared/ui';
import { EventsList } from '@/widgets';
import type { EventsContentType } from '../../model/types/eventOption.type.ts';
import { useEventsByTypeSelect } from '../../model/hooks/useEventsByTypeSelect.tsx';
import { useInfiniteScroll } from '@/shared/hooks';
import { useCallback, useEffect } from 'react';
import { useLoadMoreEvents } from '../../model/hooks/useLoadMoreEvents.tsx';
import { memo } from 'react';
import { toast } from 'react-toastify';
import { EventsLoader } from '../EventsLoader.tsx';
import { NoMyEventsYet } from './NoMyEventsYet.tsx';

interface EventCategoryContentProps {
  userId: string;
  type: EventsContentType;
}

export const EventCategoryContent = memo(({ userId, type }: EventCategoryContentProps) => {
  const { items: events, isLoading, hasMore, nextCursor, error } = useEventsByTypeSelect(userId, type);
  const { loadMore } = useLoadMoreEvents();

  const onLoadMore = useCallback(() => {
    loadMore({ userId, type, nextCursor });
  }, [loadMore, userId, type, nextCursor]);

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading,
    onLoadMore,
  });

  useEffect(() => {
    if (error) toast.warn(error);
  }, [error]);

  if (!events?.length) return (
    <>
      {isLoading ? <EventsLoader /> : <NoMyEventsYet />}
      <div ref={setTrigger} />
    </>
  );

  return (
    <div className="space-y-4">
      <EventsList events={events} withActions={type !== 'your'} />
      {isLoading && <Typography bold className="text-center">Loading more...</Typography>}
      <div ref={setTrigger} />
    </div>
  );
});


EventCategoryContent.displayName = 'EventCategoryContent';
