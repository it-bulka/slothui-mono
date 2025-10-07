import { Chat } from './entities/chat.entity';
import { ChatResponseDto } from './dto/chat-response.dto';
import { ChatWithRelations } from './types/chat.type';

export class ChatMapper {
  static toResponse(chat: Chat | ChatWithRelations): ChatResponseDto {
    const data = {
      id: chat.id,
      name: chat.name,
      ownerId: chat.ownerId,
      memberIds: chat.memberIds,
      type: chat.type,
      createdAt: chat.createdAt,
      visibility: chat.visibility,
    };
    return data;
  }
}
