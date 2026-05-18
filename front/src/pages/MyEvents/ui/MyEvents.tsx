import { Feed } from '@/widgets/Feed';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { EventsContent } from './EventsContetn/EventsContent.tsx';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Typography } from '@/shared/ui/Typography/Typography';
import { CreateEvent } from '@/pages/MyEvents/ui/CreateEvent/CreateEvent.tsx';
import { Helmet } from 'react-helmet-async';

const MyEventsPage = () => {
  const id = useAuthUserIdSelector()

  return (
    <>
      <Helmet><title>My Events — SlothUI</title></Helmet>
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