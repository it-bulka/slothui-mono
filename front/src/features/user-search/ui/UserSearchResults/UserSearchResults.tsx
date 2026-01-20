import { AvatarWithInfo, List } from '@/shared/ui';
import type { UserShort } from '@/shared/types';
import ArrowUpSvg from '@/shared/assets/images/general/arrow-up-right.svg?react'
import { useNavigate } from 'react-router';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';

interface UserSearchResultsProps {
  list: UserShort[]
  className?: string
  isLoading?: boolean
}

export const UserSearchResults = ({ list, className, isLoading }: UserSearchResultsProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return null;
  }

  if (!list.length) {
    return (
      <List className={className}>
        <List.Item btnText=''>
          Not found
        </List.Item>
      </List>
    )
  }
  return (
    <List className={className}>
      {list.map((user) => (
        <List.Item
          key={user.id}
          btnIcon={ArrowUpSvg}
          onClick={() => navigate(getUserPage(user.id))}
        >
          <AvatarWithInfo
            src={user.avatarUrl}
            position={user.username}
            name={user.nickname}
          />
        </List.Item>
      ))}
    </List>
  )
}