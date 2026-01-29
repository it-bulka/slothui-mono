import type { ChatDTO } from '@/shared/types/chat.types.ts';
import type { EntityState } from '@reduxjs/toolkit';

export type Chat = ChatDTO;
export interface ChatState extends EntityState<Chat, string>{
  activeChatId: string | null
  hasMore: boolean
  nextCursor?: string | null
  isLoading: boolean,
  error?: string | null
  searchResults: string[]
}