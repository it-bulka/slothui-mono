import type { EntityState } from '@reduxjs/toolkit';
import type { MessageDto } from '@/shared/types';

export interface MessagesState extends EntityState<MessageDto, string> {
  idsByChat: Record<string, string[]>; // масив id по чатах
  sendingByChat: Record<string, boolean>;
  loadingByChat: Record<string, boolean>;
  errorByChat: Record<string, string | undefined>;
  hasMoreByChat: Record<string, boolean>;
  cursorByChat: Record<string, string | null | undefined>;
}