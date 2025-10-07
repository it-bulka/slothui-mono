import { Chat } from '../entities/chat.entity';
export type ChatType = 'private' | 'group';
export type ChatVisibility = 'private' | 'public';
export type ChatRelations = 'members' | 'messages' | 'owner';
export type ChatWithRelations<R extends ChatRelations[] = []> = Chat & {
  [K in R[number]]: Chat[K];
};
