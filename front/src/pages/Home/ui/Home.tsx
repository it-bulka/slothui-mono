import { Feed, PostsToolbar } from '@/widgets';
import { HomeEventContent } from './HomeEventContent/HomeEventContent.tsx';
import { HomeStories } from './HomeStories/HomeStories.tsx';
import { HomeFeedContent } from './HomeFeedContent/HomeFeedContent.tsx';
import { Tab } from '@/shared/ui';
import { useInitHomePage } from '../model';

const Home = () => {
  useInitHomePage()

  return (
    <Feed header={<PostsToolbar />} >
      <HomeStories />
      <Tab
        scrollableContent
        tabs={['Posts', 'Events']}
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