import { Feed, PostsToolbar } from '@/widgets';
import { HomeEventContent } from './HomeEventContent/HomeEventContent.tsx';
import { HomeStories } from './HomeStories/HomeStories.tsx';
import { HomeFeedContent } from './HomeFeedContent/HomeFeedContent.tsx';
import { Tab } from '@/shared/ui';
import { useInitHomePage } from '../model';
import { useLocation } from 'react-router';

const Home = () => {
  useInitHomePage()
  const location = useLocation()
  const initialTab: number = (location.state as { activeTab?: number } | null)?.activeTab ?? 0

  return (
    <Feed header={<PostsToolbar />} >
      <HomeStories />
      <Tab
        scrollableContent
        tabs={['Posts', 'Events']}
        activeTabIndex={initialTab}
        contents={[
          <HomeFeedContent />,
          <HomeEventContent />,
        ]}
        contentClassName="space-y-4"
      />
    </Feed>
  )
}

export default Home