import type { MessageNotification } from '../../../../types';
import { useNavigate } from 'react-router';

export const MessageToast = ({ msg }: { msg: MessageNotification}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chats/${msg.chatId}`)}
      style={{ cursor: 'pointer' }}
    >
      <strong>{msg.from.author}</strong>
      <p>
        {msg.text ?? '📎 Attachment'}
      </p>
    </div>
  );
};
