import { Injectable } from '@nestjs/common';

@Injectable()
export class UnreadBufferService {
  // unread messages of chats
  // TODO: add Redis
  private buffer = new Map<
    string, // userId
    Record<string, number> // chatId -> delta
  >();

  increment(userId: string, chatId: string) {
    const userBuffer = this.buffer.get(userId) ?? {};
    userBuffer[chatId] = (userBuffer[chatId] ?? 0) + 1;
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
    return Object.keys(this.buffer);
  }

  flushAll() {
    const result: {
      userId: string;
      chats: Record<string, number> | null;
      total: number;
    }[] = [];

    for (const userId of this.getUsersWithUpdates()) {
      const data = this.flush(userId);
      if (!data) continue;

      result.push({
        userId,
        chats: data,
        total: Object.values(data).reduce((a, b) => a + b, 0),
      });
    }

    return result;
  }
}
