import { memo, useEffect } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { useSelectLikedEvents, fetchLikedEventsThunk } from '@/entities';
import { EventCard } from '@/entities';
import { SubscribeEventButton } from '@/features';
import { Typography } from '@/shared/ui';
import { formatDate } from '@/shared/libs';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getUserPage, getMyEventsPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const LikedEventsContent = memo(() => {
  const dispatch = useAppDispatch();
  const { items: events } = useSelectLikedEvents();
  const currentUserId = useAuthUserIdSelector();

  useEffect(() => {
    dispatch(fetchLikedEventsThunk({ cursor: null }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!events?.length) {
    return <Typography bold>No liked events yet</Typography>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {events.map((item) => {
        const isMe = currentUserId === item.organizer.id;
        return (
          <li key={item.id}>
            <EventCard
              id={item.id}
              title={item.title}
              description={item.description}
              date={formatDate(item.date)}
              location={item.location}
              profileLink={isMe ? getMyEventsPage() : getUserPage(item.organizer.id)}
              organizer={{ username: item.organizer.username, avatar: item.organizer.avatar }}
              participantsCount={item.participantsCount || 0}
              actions={<SubscribeEventButton eventId={item.id} />}
            />
          </li>
        );
      })}
    </ul>
  );
});

LikedEventsContent.displayName = 'LikedEventsContent';
