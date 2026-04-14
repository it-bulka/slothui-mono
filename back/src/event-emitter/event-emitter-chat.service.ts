import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class EventEmitterChatService {
  private readonly chatDeleted$ = new Subject<{
    chatId: string;
    memberIds: string[];
  }>();

  getDeletedEvent() {
    return this.chatDeleted$.asObservable();
  }

  onChatDeleted(chatId: string, memberIds: string[]) {
    this.chatDeleted$.next({ chatId, memberIds });
  }
}
