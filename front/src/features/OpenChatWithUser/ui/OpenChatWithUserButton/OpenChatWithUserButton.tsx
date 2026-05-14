import { memo } from 'react';
import { ActionButton } from '@/shared/ui';
import MessageIcon from '@/shared/assets/images/sidebar/message.svg?react';
import { useOpenChatWithUser } from '../../model';

export const OpenChatWithUserButton = memo(({ userId }: { userId: string }) => {
  const { handleOpenChat } = useOpenChatWithUser(userId);

  return (
    <ActionButton Icon={MessageIcon} onClick={handleOpenChat}>
      open chat
    </ActionButton>
  );
});

OpenChatWithUserButton.displayName = 'OpenChatWithUserButton';
