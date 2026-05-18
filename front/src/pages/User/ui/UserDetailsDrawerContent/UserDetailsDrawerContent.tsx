import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { SidebarInfoCard } from '@/widgets/UserRightSidebar/ui/SidebarInfoCard.tsx';
import { UserContactInformation } from '@/widgets/UserRightSidebar/ui/UserContactInformation/UserContactInformation.tsx';
import { MemberSince } from '@/widgets/UserRightSidebar/ui/MemberSince.tsx';
import { UserStories } from '@/widgets/UserRightSidebar/ui/UserStories.tsx';
import { useUserRightSidebar } from '@/widgets/UserRightSidebar/model/hooks/useUserRightSidebar.tsx';

interface UserDetailsDrawerContentProps {
  userId: string;
}

export const UserDetailsDrawerContent = ({ userId }: UserDetailsDrawerContentProps) => {
  const { isLoading, data } = useUserRightSidebar();

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 p-4 pt-2">
      <div className="mb-2">
        <UserStories userId={userId} />
      </div>

      <SidebarInfoCard title="About">
        <Typography type={TypographyTypes.P_SM}>
          {data.description || 'No information about this user yet'}
        </Typography>
      </SidebarInfoCard>

      <UserContactInformation userId={userId} />

      {data.createdAt && <MemberSince createdAt={data.createdAt} />}
    </div>
  );
};
