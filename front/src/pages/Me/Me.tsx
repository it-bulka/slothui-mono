import { Feed } from '@/widgets/Feed';
import { AddPostPanel } from '@/widgets/AddPostPanel';
import { MyFeedContent } from './ui/MyFeedContent/MyFeedContent.tsx';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';

const Me = () => {
  return (
    <>
      <Feed
        header={(
          <div className={"toolbar relative"}>
            <AddPostPanel />
            <AppLink to={RoutePaths.my_events} className="ml-auto">Go to Events</AppLink>
          </div>
        )}>
        <MyFeedContent />
      </Feed>
    </>
  )
}

export default Me;