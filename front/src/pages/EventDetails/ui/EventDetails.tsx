import { EventDetails } from '@/entities/Event';
import { Participants } from '@/pages/EventDetails/ui/Participants/Participants.tsx';
import { useParams, Navigate } from 'react-router';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';

const EventDetailsPage = () => {
  const { id } = useParams<{id: string}>();
  if(!id) {
      return <Navigate to={RoutePaths.not_found} />
  }
  return (
    <div className="px-main py-main">
      <EventDetails
        id={id}
        title="Frontend Meetup"
        description="Зустріч розробників для обговорення React, TypeScript і FSD архітектури."
        date="2025-11-12"
        location="Київ, UNIT.City"
        position={[7878,99.9]}
        organizer={{ name: 'Iv Li', avatar: '/avatars/ivli.png' }}
      />
        <Participants
          participantsCount={57}
          participants={[
              { id: '1', name: 'jkjkjkj', avatar: '/avatars/jkjkjkj.png' },
              { id: '1', name: 'jkjkjkj', avatar: '/avatars/jkjkjkj.png' },
          ]}
        />
    </div>
  )
}

export default EventDetailsPage