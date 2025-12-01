import { GroupedAttachment } from '../../attachments/types/attachments.type';

export type MessageResponseDto = {
  id: string;
  chatId: string;
  text: string;
  attachments?: GroupedAttachment;
  authorId: string;
};
