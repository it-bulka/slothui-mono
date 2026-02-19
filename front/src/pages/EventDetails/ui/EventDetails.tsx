import { Participants } from './Participants/Participants.tsx';
import { useParams, Navigate } from 'react-router';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { EventInfo } from './EventInfo/EventInfo.tsx';

const EventDetailsPage = () => {
  const { id } = useParams<{id: string}>();

  if(!id) return <Navigate to={RoutePaths.not_found} />

  return (
    <div className="px-main py-main">
      <EventInfo id={id} />
      <Participants id={id} />
    </div>
  )
}

export default EventDetailsPage