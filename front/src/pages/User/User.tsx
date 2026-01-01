import { Feed, ContactUserToolbar } from '@/widgets';
import { useParams } from 'react-router';
import { useSelectProfilePosts } from '@/entities';

const User = () => {
  const { userId } = useParams();
  const { posts } = useSelectProfilePosts(userId);

  return (
    <Feed header={<ContactUserToolbar />} posts={posts} />
  )
}

export default User