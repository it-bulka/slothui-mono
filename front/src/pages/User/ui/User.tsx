import { Feed, ContactUserToolbar } from '@/widgets';
import { useParams } from 'react-router';
import { UserFeedContent } from './UserFeedContent/UserFeedContent.tsx';
import { UserStories } from './UserStories/UserStories.tsx';
import { UserEventContent } from './UserEventContent/UserEventContent.tsx';
import { Tab } from '@/shared/ui';

const User = () => {
  const { id: userId } = useParams<{ id: string }>();

  if(!userId) return <p>Not Found User Id</p>
  return (
    <Feed header={<ContactUserToolbar />}>
      <UserStories />
      <Tab
        tabs={['Posts', 'Events']}
        contents={[
          <UserFeedContent userId={userId} />,
          <UserEventContent userId={userId} />
        ]}
        contentClassName="space-y-4"
      />
    </Feed>
  )
}

export default User