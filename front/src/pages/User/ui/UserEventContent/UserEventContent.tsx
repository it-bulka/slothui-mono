import { useEventsByUserSelect, useFetchEventsByUser } from '@/entities';
import { SubscribeEventButton } from '@/features';
import { EventCardWithDelete } from '@/features/DeleteEvent';
import { Typography } from '@/shared/ui';
import { useInfiniteScroll } from '@/shared/hooks';
import { useEffect } from 'react';
import { formatDate } from '@/shared/libs';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getMyEventsPage, getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const UserEventContent = ({ userId }: { userId: string }) => {
  const { items: events, isLoading, hasMore, error } = useEventsByUserSelect(userId)
  const { fetchEventsByUser } = useFetchEventsByUser()
  const currentUserId = useAuthUserIdSelector()

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
        <EventCardWithDelete
          id={item.id}
          key={item.id}
          title={item.title}
          description={item.description}
          date={formatDate(item.date)}
          location={item.location}
          category={item.category}
          coverUrl={item.coverUrl}
          onlineUrl={item.onlineUrl}
          profileLink={currentUserId === item.organizer.id ? getMyEventsPage() : getUserPage(item.organizer.id)}
          organizer={{ username: item.organizer.username, avatar: item.organizer.avatar }}
          participantsCount={item.participantsCount || 0}
          isOwner={currentUserId === item.organizer.id}
          actions={<SubscribeEventButton eventId={item.id} isSubscribed={item.isSubscribed} />}
        />
      ))}
      {isLoading && <Typography bold>Loading...</Typography>}
      <div ref={setTrigger} />
    </>
  )
}
