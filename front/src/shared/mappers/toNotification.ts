import type { MessageDto , MessageNotification} from '../types';

export function msgToNotification(msg: MessageDto): MessageNotification {
  return {
    id: msg.id,
    chatId: msg.chatId,
    text: msg.text,
    isAttachment: 'attachments' in msg && !!msg.attachments,
  };
}