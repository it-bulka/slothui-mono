import type { MessageNotification, Author } from '../../../../types';
import { useNavigate } from 'react-router';
import { Typography } from '@/shared/ui';

export const MessageToast = ({ msg, author }: { msg: MessageNotification, author: Author }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/chats/${msg.chatId}`)}
      style={{ cursor: 'pointer' }}
    >
      <Typography bold>new message</Typography>
      <Typography className="text-[0.6em]"><span>from</span> <strong>@{author.nickname}</strong></Typography>
      <p>
        {msg.text ?? '📎 Attachment'}
      </p>
    </div>
  );
};
