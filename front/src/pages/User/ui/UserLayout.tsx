import { useState } from 'react';
import { useParams, Outlet } from 'react-router';
import { Drawer } from '@/shared/ui/Drawer';
import { UserMobileTopBar } from './UserMobileTopBar/UserMobileTopBar.tsx';
import { UserDetailsDrawerContent } from './UserDetailsDrawerContent/UserDetailsDrawerContent.tsx';

const UserLayout = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (!userId) return <p>Not Found User Id</p>;

  return (
    <div className="flex flex-col min-h-full">
      <div className="sticky top-0 z-40 md:hidden">
        <UserMobileTopBar
          userId={userId}
          onSeeMore={() => setIsDetailOpen(true)}
        />
      </div>
      <Outlet />
      <Drawer isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        <UserDetailsDrawerContent userId={userId} />
      </Drawer>
    </div>
  );
};

export default UserLayout;
