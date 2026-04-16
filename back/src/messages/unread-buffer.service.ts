import { Injectable } from '@nestjs/common';
import { ChatUnreadUpdate, ChatLastMessage } from './dto/unread-buffer.dto';

@Injectable()
export class UnreadBufferService {
  // unread messages of chats
  // TODO: add Redis
  private buffer = new Map<
    string, // userId
    Record<string, ChatUnreadUpdate> // chatId -> ChatUnreadUpdate
  >();

  increment(userId: string, chatId: string, lastMsg: ChatLastMessage) {
    const userBuffer = this.buffer.get(userId) ?? {};
    const current = userBuffer[chatId] ?? {
      unreadDelta: 0,
      lastMessage: lastMsg,
    };

    userBuffer[chatId] = {
      unreadDelta: current.unreadDelta + 1,
      lastMessage: lastMsg,
    };
    this.buffer.set(userId, userBuffer);
  }

  clear(chatId: string, userId: string) {
    const userChats = this.buffer.get(userId);
    if (!userChats) return;
    delete userChats[chatId];
  }

  flush(userId: string) {
    const data = this.buffer.get(userId);
    if (!data) return null;
    this.buffer.set(userId, {});
    return data;
  }

  getUsersWithUpdates() {
    return [...this.buffer.keys()];
  }

  flushAll() {
    const result: {
      userId: string;
      updates: {
        chatId: string;
        lastMessage: ChatLastMessage;
        unreadDelta: number;
      }[];
      totalDelta: number;
    }[] = [];

    for (const userId of this.getUsersWithUpdates()) {
      const data = this.flush(userId);
      if (!data) continue;

      result.push({
        userId,
        updates: Object.entries(data).map(([chatId, value]) => ({
          chatId,
          ...value,
        })),
        totalDelta: Object.values(data).reduce((a, b) => a + b.unreadDelta, 0),
      });
    }

    return result;
  }
}
