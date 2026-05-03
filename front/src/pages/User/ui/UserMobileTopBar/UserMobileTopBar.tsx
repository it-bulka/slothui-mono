import { Statistics } from '@/entities';
import { Button } from '@/shared/ui';
import { ActionRow } from '@/widgets/UserRightSidebar/ui/ActionRow.tsx';
import { UserProfileData } from '@/widgets/UserRightSidebar/ui/UserProfileData/UserProfileData.tsx';
import { useUserRightSidebar } from '@/widgets/UserRightSidebar/model/hooks/useUserRightSidebar.tsx';
import { twMerge } from 'tailwind-merge';

interface UserMobileTopBarProps {
  userId: string;
  onSeeMore: () => void;
  className?: string;
}

export const UserMobileTopBar = ({ userId, onSeeMore, className }: UserMobileTopBarProps) => {
  const { isLoading, data, friend } = useUserRightSidebar();

  if (isLoading || !data) return null;

  return (
    <div className={twMerge("flex flex-col gap-3 px-4 py-4 bg-white border-b border-gray-g3", className)}>
      <UserProfileData
        avatarSrc={data.avatarUrl}
        username={data.username}
        nickname={data.nickname}
      />
      <Statistics
        followingCount={data.followeesCount}
        followersCount={data.followersCount}
        postsCount={data.postsCount}
        hrefs={{
          posts: `/users/${userId}`,
          followers: `/users/${userId}/friends?type=followers`,
          following: `/users/${userId}/friends?type=followings`,
        }}
      />
      <ActionRow userId={userId} isFollowee={friend?.isFollowee} />
      <Button variant="outlined" onClick={onSeeMore} fullWidth>
        See more
      </Button>
    </div>
  );
};
