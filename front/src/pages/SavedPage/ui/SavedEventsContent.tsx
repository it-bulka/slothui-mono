import { memo, useEffect } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { useSelectSavedEvents, fetchSavedEventsThunk } from '@/entities';
import { SubscribeEventButton } from '@/features';
import { EventCardWithDelete } from '@/features/DeleteEvent';
import { formatDate } from '@/shared/libs';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getUserPage, getMyEventsPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { NoSavedEventsYet } from './NoSavedEventsYet.tsx';

export const SavedEventsContent = memo(() => {
  const dispatch = useAppDispatch();
  const { items: events } = useSelectSavedEvents();
  const currentUserId = useAuthUserIdSelector();

  useEffect(() => {
    dispatch(fetchSavedEventsThunk({ cursor: null }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!events?.length) {
    return <NoSavedEventsYet />;
  }

  return (
    <ul className="flex flex-col gap-4">
      {events.map((item) => (
        <li key={item.id}>
          <EventCardWithDelete
            id={item.id}
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
            actions={<SubscribeEventButton eventId={item.id} />}
          />
        </li>
      ))}
    </ul>
  );
});

SavedEventsContent.displayName = 'SavedEventsContent';
