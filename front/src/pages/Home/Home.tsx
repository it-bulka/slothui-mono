import { Feed, PostsToolbar } from '@/widgets';
import { useSelectFeedPosts } from '@/entities';

const Home = () => {
  const { posts } = useSelectFeedPosts()
  return <Feed header={<PostsToolbar />} posts={posts} />
}

export default Home