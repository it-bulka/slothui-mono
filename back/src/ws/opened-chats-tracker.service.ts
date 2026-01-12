import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenedChatsTracker {
  // TODO: add Redis
  private opened = new Map<string, Set<string>>(); // userId -> Set<chatId>

  openChat(userId: string, chatId: string) {
    if (!this.opened.has(userId)) {
      this.opened.set(userId, new Set());
    }
    this.opened.get(userId)!.add(chatId);
  }

  closeChat(userId: string, chatId: string) {
    this.opened.get(userId)?.delete(chatId);
  }

  isChatOpened(userId: string, chatId: string) {
    return this.opened.get(userId)?.has(chatId) ?? false;
  }
}
