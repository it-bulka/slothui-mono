import { memo, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Participants } from './Participants/Participants.tsx';
import { useParams, Navigate } from 'react-router';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { EventInfo } from './EventInfo/EventInfo.tsx';
import { Typography } from '@/shared/ui/Typography/Typography';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';

const EventDetailsPage = memo(() => {
  const { id } = useParams<{id: string}>();
  const [participantsKey, setParticipantsKey] = useState(0);

  const handleSubscribedChange = useCallback(() => {
    setParticipantsKey(k => k + 1);
  }, []);

  if(!id) return <Navigate to={RoutePaths.not_found} />

  return (
    <div className="relative flex flex-col min-h-full">
      <Helmet>
        <title>Event — SlothUI</title>
        <meta name="description" content="View event details, info and participants on SlothUI." />
      </Helmet>
      <Typography
        variant="h1"
        type={TypographyTypes.BLOCK_TITLE}
        bold
        className="toolbar sticky top-0 z-10"
      >
        Event
      </Typography>
      <div className="px-main py-main">
        <EventInfo id={id} onSubscribedChange={handleSubscribedChange} />
        <Participants id={id} refreshKey={participantsKey} />
      </div>
    </div>
  )
})

EventDetailsPage.displayName = 'EventDetailsPage'
export default EventDetailsPage
