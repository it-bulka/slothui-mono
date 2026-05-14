import { useState } from 'react';
import { Feed, ContactUserToolbar } from '@/widgets';
import { useParams } from 'react-router';
import { UserFeedContent } from './UserFeedContent/UserFeedContent.tsx';
import { UserEventContent } from './UserEventContent/UserEventContent.tsx';
import { Tab, Drawer } from '@/shared/ui';
import { UserMobileTopBar } from './UserMobileTopBar/UserMobileTopBar.tsx';
import { UserDetailsDrawerContent } from './UserDetailsDrawerContent/UserDetailsDrawerContent.tsx';

const User = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (!userId) return <p>Not Found User Id</p>;

  const header = (
    <>
      <ContactUserToolbar className="hidden md:flex" userId={userId} />
      <UserMobileTopBar
        className="md:hidden"
        userId={userId}
        onSeeMore={() => setIsDetailOpen(true)}
      />
    </>
  );

  return (
    <Feed header={header}>
      <Tab
        scrollableContent
        sticky
        tabs={['Posts', 'Events']}
        contents={[
          <UserFeedContent userId={userId} />,
          <UserEventContent userId={userId} />,
        ]}
        contentClassName="space-y-4"
      />

      <Drawer isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        <UserDetailsDrawerContent userId={userId} />
      </Drawer>
    </Feed>
  );
};

export default User;
