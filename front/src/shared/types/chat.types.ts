export interface UserDTO {
  id: string;
  username: string;
  nickname: string;
  avatarUrl: string;
}

export type LastMessage = {
  id: string;
  text: string;
  createdAt: string;
}

export interface ChatDTO {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: LastMessage;
  anotherMember?: UserDTO;
  isMember?: boolean;
  updatedAt: string;
}

export interface MessageDTO {
  id: string;
  chatId: string;
  author: string;
  text: string;
  sentAt: string;
}

export type ChatGlobalSearchResult = ({ type: 'chat', chat: ChatDTO } | { type: 'user', user: UserDTO })[];
