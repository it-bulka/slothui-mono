export interface UserDTO {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface ChatDTO {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: {
    id: string;
    text: string;
    createdAt: string;
  }
  members: string[];
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
