import { useParams } from 'react-router';
import { TabWithFriends } from '@/features';
import { useAuthUserSelector } from '@/entities/AuthUser';

const UserFriends = () => {
  const { id: profileUserId } = useParams<{ id: string }>();
  const authUser = useAuthUserSelector();

  if (!profileUserId || !authUser) return null;

  return <TabWithFriends userId={profileUserId} isOwner={false} />;
};

export default UserFriends