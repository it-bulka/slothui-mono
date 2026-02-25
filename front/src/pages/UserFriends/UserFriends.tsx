import { TabWithFriends } from '@/features';
import { useAuthUserSelector } from '@/entities/AuthUser';


const UserFriends = () => {
  const user = useAuthUserSelector()

  if (!user) return null;

  return (
    <TabWithFriends userId={user.id} />
  )
}

export default UserFriends