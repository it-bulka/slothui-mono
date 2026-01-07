import { Feed, PostTextarea } from '@/widgets';
import { AddPostBtn } from '@/features';
import { useState } from 'react';
import { MyFeedContent } from './ui/MyFeedContent/MyFeedContent.tsx';
import { AppLink } from '@/shared/ui';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';

const Me = () => {
  const [isPostTextarea, setPostTextarea] = useState(false);

  return (
    <>
      <Feed
        header={(
        <div className={"toolbar"}>
          <AddPostBtn
            onClick={() => setPostTextarea(prev => !prev)}
            active={!isPostTextarea}
            className="ml-auto"
          />
          {isPostTextarea && <PostTextarea className="basis-full py-6"/>}
        </div>
        )}>
        <>
          <AppLink to={RoutePaths.my_events} className="ml-auto">Go to Events</AppLink>
          <MyFeedContent />
        </>
      </Feed>
    </>

  )
}

export default Me;