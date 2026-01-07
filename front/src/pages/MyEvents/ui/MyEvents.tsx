import { Feed } from '@/widgets';
import { AppLink } from '@/shared/ui';
import { useUserIdSelector } from '@/entities/User';
import { EventsContent } from './EventsContetn/EventsContent.tsx';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Typography } from '@/shared/ui';
import { CreateEvent } from '@/pages/MyEvents/ui/CreateEvent/CreateEvent.tsx';

const MyEventsPage = () => {
  const id = useUserIdSelector()

  return (
    <>
      <Feed
        header={(
          <div className={"toolbar flex justifyBetween"}>
            <CreateEvent />
            <AppLink to={RoutePaths.my_posts} className="ml-auto">Go to Posts</AppLink>
          </div>
        )}>
        <>
          { !id
            ? <Typography>User not authorized</Typography>
            : <EventsContent userId={id} />
          }
        </>
      </Feed>
    </>

  )
}

export default MyEventsPage;