import { useEventsHomeSelect } from '@/entities';
import { SubscribeEventButton } from '@/features';
import { EventCardWithDelete } from '@/features/DeleteEvent';
import { Skeleton } from '@/shared/ui/Skeleton';
import { memo } from 'react';
import { formatDate } from '@/shared/libs';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getMyEventsPage, getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useHomeEventsFeed } from '../../model/hooks/useHomeEventsFeed.tsx';
import { NoHomeEventsYet } from './NoHomeEventsYet.tsx';

export const HomeEventContent = memo(() => {
  const { items: events } = useEventsHomeSelect()
  const currentUserId = useAuthUserIdSelector()
  const { setTrigger, isLoading } = useHomeEventsFeed()

  if(!events?.length && !isLoading) return <NoHomeEventsYet />

  return (
    <>
      {events.map((item) => (
        <EventCardWithDelete
          id={item.id}
          key={item.id}
          title={item.title}
          description={item.description}
          date={formatDate(item.date)}
          location={typeof item.location === 'object' ? item.location?.address : item.location}
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
      {isLoading && (
        <div className="p-4 rounded-2xl bg-light-l3 shadow flex flex-col gap-3">
          <Skeleton height={144} border="16px" />
          <div className="flex flex-col gap-2">
            <Skeleton height={16} width="70%" />
            <Skeleton height={12} width="50%" />
            <Skeleton height={12} width="40%" />
          </div>
        </div>
      )}
      <div ref={setTrigger} className="h-[2px] mb-[2px]"/>
    </>
  )
})

HomeEventContent.displayName = 'HomeEventContent'
