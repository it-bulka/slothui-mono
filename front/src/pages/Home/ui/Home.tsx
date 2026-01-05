import { Feed, PostsToolbar } from '@/widgets';
import { HomeEventContent } from './HomeEventContent/HomeEventContent.tsx';
import { HomeStories } from './HomeStories/HomeStories.tsx';
import { HomeFeedContent } from './HomeFeedContent/HomeFeedContent.tsx';
import { Tab } from '@/shared/ui';

const Home = () => {
  return (
    <Feed header={<PostsToolbar />} >
      <HomeStories />
      <Tab
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