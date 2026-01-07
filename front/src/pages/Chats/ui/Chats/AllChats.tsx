import { Chats, useUserChatSelect } from '@/entities';
import { memo } from 'react';

export const AllChats = memo(({ userId }: { userId: string }) => {
  const items = useUserChatSelect(userId)
  return <Chats chats={items} />
})

AllChats.displayName = 'AllChats'