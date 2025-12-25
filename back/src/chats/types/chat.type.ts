import { Chat } from '../entities/chat.entity';
export type ChatType = 'private' | 'group';
export type ChatVisibility = 'private' | 'public';
export type ChatRelations = 'members' | 'messages' | 'owner';
export type ChatWithRelations<R extends ChatRelations[] = []> = Chat & {
  [K in R[number]]: Chat[K];
};

export interface ChatMemberDTO {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface LastMessageDTO {
  id: string;
  text: string;
  createdAt: string;
}

export interface ChatListItemDTO {
  id: string;
  name: string;
  avatarUrl?: string | null; // avatar of chat or other user
  lastMessage?: LastMessageDTO;
  membersCount: number;
  isPrivate: boolean;
  isClosedGroup?: boolean;
  otherUser?: ChatMemberDTO; // just for private
  updatedAt: string;
}

export interface ChatGlobalDTO {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: LastMessageDTO;
  membersCount?: number;
}

export type ChatGlobalSearchResult =
  | { type: 'chat'; chat: ChatGlobalDTO }
  | { type: 'user'; user: ChatMemberDTO };

export interface SearchOptions {
  userId: string;
  query: string;
  limit?: number; // 50
  cursor?: string;
}
