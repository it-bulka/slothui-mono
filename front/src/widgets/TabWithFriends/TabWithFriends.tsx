import type { ReactNode } from 'react';
import { AvatarWithInfo, List, Tab } from '@/shared/ui';

type Content = {
  src: string
  username: string
  nickname: string
}
interface TabWithFriendsProps {
  tabs: ReactNode[];
  contents: Content[][];
}

export const TabWithFriends = ({ tabs, contents}: TabWithFriendsProps) => {
  return (
    <Tab
      tabs={tabs}
      contents={contents.map(items => (
        <List topBorder={false}>
          {items.map(friend => (
            <List.Item btnText="+">
              <AvatarWithInfo src={friend.src} position={friend.nickname} name={friend.username} />
            </List.Item>
          ))}
        </List>
      ))}
    />
  )
}