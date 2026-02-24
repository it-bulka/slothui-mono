import type { EntityState } from '@reduxjs/toolkit';
import type { MessageDto } from '@/shared/types';

type ChatId = string
export interface MessagesState extends EntityState<MessageDto, string> {
  idsByChat: Record<ChatId, string[]>; // масив id по чатах
  sendingByChat: Record<ChatId, boolean>;
  loadingByChat: Record<ChatId, boolean>;
  errorByChat: Record<ChatId, string | undefined>;
  hasMoreByChat: Record<ChatId, boolean>;
  cursorByChat: Record<ChatId, string | null | undefined>;
}