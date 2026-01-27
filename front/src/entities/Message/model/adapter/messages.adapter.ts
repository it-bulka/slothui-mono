import { createEntityAdapter } from '@reduxjs/toolkit';
import type { MessageDto } from '@/shared/types';

export const messagesAdapter = createEntityAdapter<MessageDto, string>({
  selectId: (msg) => msg.id,
  sortComparer: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});