import { memo } from 'react';
import { ActionButton } from '@/shared/ui';
import ChatSvg from '@/shared/assets/images/sidebar/5.chat.svg?react';
import { twMerge } from 'tailwind-merge';
import { useOpenChatWithUser } from '@/features/OpenChatWithUser';

interface ContactUserToolbarProps {
  className?: string;
  userId: string;
}

export const ContactUserToolbar = memo(({ className, userId }: ContactUserToolbarProps) => {
  const { handleOpenChat } = useOpenChatWithUser(userId);

  return (
    <div className={twMerge("border-style-b px-main py-5 flex flex-wrap justify-end", className)}>
      <ActionButton Icon={ChatSvg} column onClick={handleOpenChat}>
        {'Send message >'}
      </ActionButton>
    </div>
  );
});

ContactUserToolbar.displayName = 'ContactUserToolbar';
