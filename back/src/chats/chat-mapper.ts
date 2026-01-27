import { Chat } from './entities/chat.entity';
import { ChatDetailsDTO, ChatListItemDTO } from './types/chat.type';

export class ChatMapper {
  static toDetails(chat: Chat): ChatDetailsDTO {
    return {
      id: chat.id,
      name: chat.name,
      avatarUrl: chat.avatarUrl,
      ownerId: chat.ownerId,
      isPrivate: chat.type === 'private',
      visibility: chat.visibility,
      createdAt: chat.createdAt.toISOString(),
      updatedAt: chat.updatedAt.toISOString(),
    };
  }

  static toListItem(chat: Chat, membersCount: number): ChatListItemDTO {
    return {
      id: chat.id,
      name: chat.name ?? 'Chat',
      avatarUrl: chat.avatarUrl,
      isPrivate: chat.type === 'private',
      membersCount,
      lastMessage: chat.lastMessage && undefined,
      updatedAt: chat.updatedAt.toISOString(),
    };
  }
}
