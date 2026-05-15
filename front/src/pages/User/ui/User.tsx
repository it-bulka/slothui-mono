import { Feed, ContactUserToolbar } from '@/widgets';
import { useParams, useSearchParams } from 'react-router';
import { UserFeedContent } from './UserFeedContent/UserFeedContent.tsx';
import { UserEventContent } from './UserEventContent/UserEventContent.tsx';
import { Tab } from '@/shared/ui';
import { Helmet } from 'react-helmet-async';
import { useUserProfileSelect } from '@/entities';

const TYPE_TO_INDEX: Record<string, number> = { posts: 0, events: 1 };
const INDEX_TO_TYPE = ['posts', 'events'];

const User = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: profile } = useUserProfileSelect(userId);

  if (!userId) return <p>Not Found User Id</p>;

  const pageTitle = profile?.nickname ? `${profile.nickname} — SlothUI` : 'User — SlothUI';

  const activeTabIndex = TYPE_TO_INDEX[searchParams.get('type') ?? ''] ?? 0;

  const handleTabChange = (index: number) => {
    setSearchParams({ type: INDEX_TO_TYPE[index] }, { replace: true });
  };

  return (
    <Feed header={<ContactUserToolbar className="hidden md:flex" userId={userId} />}>
      <Helmet><title>{pageTitle}</title></Helmet>
      <Tab
        scrollableContent
        sticky
        tabs={['Posts', 'Events']}
        contents={[
          <UserFeedContent userId={userId} />,
          <UserEventContent userId={userId} />,
        ]}
        contentClassName="space-y-4"
        activeTabIndex={activeTabIndex}
        onTabChange={handleTabChange}
      />
    </Feed>
  );
};

export default User;
