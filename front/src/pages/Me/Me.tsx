import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Feed } from '@/widgets/Feed';
import { AddPostPanel } from '@/widgets/AddPostPanel';
import { MyFeedContent } from './ui/MyFeedContent/MyFeedContent.tsx';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';

const Me = memo(() => {
  return (
    <>
      <Helmet>
        <title>My Posts — SlothUI</title>
        <meta name="description" content="View and manage your posts on SlothUI." />
      </Helmet>
      <Feed
        header={(
          <div className="toolbar relative">
            <AddPostPanel />
            <AppLink to={RoutePaths.my_events} className="ml-auto">Go to Events</AppLink>
          </div>
        )}>
        <MyFeedContent />
      </Feed>
    </>
  )
})

Me.displayName = 'Me'
export default Me
