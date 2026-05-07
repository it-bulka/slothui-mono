import { useGlobalChatsSearch } from '../../model/hooks/useGlobalChatsSearch.tsx';
import { Typography } from '@/shared/ui';
import { memo, useCallback } from 'react';
import { ChatRow, createPrivateChatThunk, useGoToChat } from '@/entities';
import { useAppDispatch } from '@/shared/config/redux';

interface UserRowProps {
  user: { id: string; name: string; avatarUrl?: string };
  onOpen: (id: string) => void;
}

const UserSearchRow = memo(({ user, onOpen }: UserRowProps) => {
  const handleClick = useCallback(() => onOpen(user.id), [user.id, onOpen]);
  return <ChatRow name={user.name} avatar={user.avatarUrl} onClick={handleClick} />;
});

UserSearchRow.displayName = 'UserSearchRow';

export const GlobalChatsSearchResult = memo(() => {
  const { items } = useGlobalChatsSearch()
  const { goToChat } = useGoToChat()
  const dispatch = useAppDispatch()

  const openChatWithUser = useCallback((userId: string) => {
    dispatch(createPrivateChatThunk(userId))
      .unwrap()
      .then((res ) => goToChat(res.id))
  }, [dispatch, goToChat])

  if(!items?.length) return null;

  return (
    <div className="border-top">
      <Typography>Global results:</Typography>
      {
        items.map(item => {
          if (item.type === 'chat') {
            const {chat} = item
            return (
              <ChatRow
                key={chat.id}
                name={chat.name}
                avatar={chat.avatarUrl}
                messagePreview={chat.lastMessage?.text}
                onClick={goToChat(chat.id)}
              />
            );
          }

          if (item.type === 'user') {
            const { user } = item
            return (
              <UserSearchRow key={user.id} user={user} onOpen={openChatWithUser} />
            );
          }

          return null
        })
      }
    </div>
  )
})

GlobalChatsSearchResult.displayName = 'GlobalChatsSearchResult'