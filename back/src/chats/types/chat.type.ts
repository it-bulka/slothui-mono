export type ChatType = 'private' | 'group';
export type ChatVisibility = 'private' | 'public';

export interface ChatMemberDTO {
  id: string;
  name: string;
  nickname: string;
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
  avatarUrl?: string | null;
  lastMessage?: LastMessageDTO;
  membersCount: number;
  isPrivate: boolean;
  isClosedGroup?: boolean;
  anotherMember?: ChatMemberDTO; // just for private
  updatedAt: string;
  isMember?: boolean;
}

export interface ChatMembersIdsDTO {
  memberIds: string[];
}

export interface ChatMembersDTO {
  members: ChatMemberDTO[];
}

export interface ChatDetailsDTO {
  id: string;
  name?: string | null;
  avatarUrl?: string | null;
  isPrivate: boolean;
  ownerId: string;
  visibility: string;
  createdAt: string; //ISO
  updatedAt: string; //ISO
}

export type ChatWithMemberIdsDTO = ChatDetailsDTO & ChatMembersIdsDTO;
export type ChatWithMembersDTO = ChatDetailsDTO & ChatMembersDTO;

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
