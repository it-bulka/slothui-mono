import { memo } from 'react';
import { Feed } from '@/widgets/Feed';
import { PostsToolbar } from '@/widgets/PostsToolbar';
import { HomeEventContent } from './HomeEventContent/HomeEventContent.tsx';
import { HomeStories } from './HomeStories/HomeStories.tsx';
import { HomeFeedContent } from './HomeFeedContent/HomeFeedContent.tsx';
import { Tab } from '@/shared/ui/Tab/Tab';
import { useInitHomePage } from '../model';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';

const Home = memo(() => {
  useInitHomePage()
  const location = useLocation()
  const initialTab: number = (location.state as { activeTab?: number } | null)?.activeTab ?? 0

  return (
    <Feed header={<PostsToolbar />} >
      <Helmet>
        <title>Home — SlothUI</title>
        <meta name="description" content="Your feed on SlothUI — posts, events and stories from friends." />
      </Helmet>
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
})

Home.displayName = 'Home'
export default Home