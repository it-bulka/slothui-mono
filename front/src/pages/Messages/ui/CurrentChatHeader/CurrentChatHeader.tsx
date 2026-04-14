import { AvatarWithInfo, MoreButton } from '@/shared/ui';
import { Link, useNavigate } from 'react-router';
import { useActiveChatDataSelector } from '@/entities';
import { memo, useCallback } from 'react';
import { getUserPage, RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useDeleteChat, DeleteChatModal, ChatActionsMenu } from '@/features/DeleteChat';

export const CurrentChatHeader = memo(() => {
  const chat = useActiveChatDataSelector()
  const navigate = useNavigate()
  const { confirmChatId, requestDelete, cancelDelete, confirmDelete } = useDeleteChat()

  const handleRequestDelete = useCallback(() => {
    if (chat?.id) requestDelete(chat.id);
  }, [chat?.id, requestDelete])

  const handleConfirmDelete = useCallback(async () => {
    const deleted = await confirmDelete();
    if (deleted) navigate(RoutePaths.chats);
  }, [confirmDelete, navigate])

  if (!chat) return null;

  const avatarWithInfo = (
    <AvatarWithInfo
      src={chat.anotherMember?.avatarUrl || chat.avatarUrl}
      name={chat.anotherMember?.username || chat.name}
      position={chat.anotherMember?.nickname ? `@${chat.anotherMember?.nickname}` : ''}
    />
  )

  return (
    <div className="border-style-b px-6 py-4 flex items-center justify-between">
      <div className="min-w-0 grow">
        {chat.anotherMember
          ? <Link to={getUserPage(chat.anotherMember.id)}>{avatarWithInfo}</Link>
          : avatarWithInfo
        }
      </div>

      <MoreButton
        content={<ChatActionsMenu onDelete={handleRequestDelete} />}
      />

      <DeleteChatModal
        isOpen={!!confirmChatId}
        onConfirm={handleConfirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
})

CurrentChatHeader.displayName = "CurrentChatHeader";
