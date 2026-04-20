import { EventCard, useEventsByUserSelect, useFetchEventsByUser } from '@/entities';
import { SubscribeEventButton } from '@/features';
import { Typography } from '@/shared/ui';
import { useInfiniteScroll } from '@/shared/hooks';
import { useEffect } from 'react';

export const UserEventContent = ({ userId }: { userId: string }) => {
  const { items: events, isLoading, hasMore, error } = useEventsByUserSelect(userId)
  const { fetchEventsByUser } = useFetchEventsByUser()

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore && !error,
    isLoading,
    onLoadMore: () => fetchEventsByUser({ userId })
  })

  useEffect(() => {
    fetchEventsByUser({ userId })
  }, [fetchEventsByUser, userId])

  if(!events?.length && !isLoading) return <Typography bold>No any event yet</Typography>

  return (
    <>
      {events.map((item) => (
        <EventCard
          id={item.id}
          key={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
          location={item.location}
          category={item.category}
          coverUrl={item.coverUrl}
          onlineUrl={item.onlineUrl}
          organizer={{ username: item.organizer.username, avatar: item.organizer.avatar }}
          participantsCount={item.participantsCount || 0}
          actions={(
            <SubscribeEventButton eventId={item.id} isSubscribed={item.isSubscribed} />
          )}
        />
      ))}
      {isLoading && <Typography bold>Loading...</Typography>}
      <div ref={setTrigger} />
    </>
  )
}