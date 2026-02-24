import { Observable, shareReplay, Subject } from 'rxjs';
import type { MessageToSend } from '../../../types/message.types.ts';
import { Socket } from 'socket.io-client';
import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';
import {
  MessageRequestEvents,
  MessageServerEvents
} from './message.events.ts';
import type { MessageDto, PaginatedResponse } from '../../../types';
import { filter } from 'rxjs';

export class MessagesService {
  private readonly message$ = new Subject<MessageDto>();
  private readonly typing$ = new Subject<{ chatId: string; user: string; isTyping: boolean }>();

  private socket: Socket | undefined;

  constructor(
    private readonly http: HttpService,
    private readonly wsService: SocketService
  ) {
    wsService.onConnected(() => {
      this.socket = wsService.socket
      this.init()
    })
  }

  private init() {
    this.registerEvents()

    this.wsService.$reconnected.subscribe(() => {
      console.log('socket - reconnect - message service')
      this.socket = this.wsService.socket;
      this.offEvents()
      this.registerEvents()
    })
  }

  private registerEvents(){
    /* events from Server → Subject */
    const socket = this.socket
    if(!socket) throw this.wsService.callNoConnectionError()
    socket.on(MessageServerEvents.NEW,         (m: MessageDto) => this.message$.next(m));
    socket.on(MessageServerEvents.TYPING,      (t) => this.typing$.next(t));

  }

  private offEvents() {
    const socket = this.socket
    if(!socket) return;
    socket.off(MessageServerEvents.NEW)
    socket.off(MessageServerEvents.TYPING)
  }

  wsSend(chatId: string, text: string): void    { this.socket?.emit(MessageRequestEvents.SEND,    { chatId, text }); }
  wsTyping(chatId: string, isTyping: boolean): void { this.socket?.emit(MessageRequestEvents.TYPING, { chatId, isTyping }); }

  /** POST /api/chats/:id/messages  MessageToSend */
  async sendMessage(msg: MessageToSend & { chatId: string }): Promise<void> {
    const fd = new FormData();
    fd.append('text', msg.text);

    if('geo' in msg && msg.geo) {
      fd.append('geo',JSON.stringify(msg.geo));
    }

    if('poll' in msg && msg.poll) {
      fd.append('poll',JSON.stringify(msg.poll));
    }

    if('attachments' in msg && msg.attachments) {
      msg.attachments?.images?.forEach(file => {
        fd.append('images', file); // file = File
      });

      msg.attachments?.audio?.forEach(file => {
        fd.append('audio', file);
      });

      msg.attachments?.video?.forEach(file => {
        fd.append('video', file);
      });

      msg.attachments?.file?.forEach(file => {
        fd.append('file', file);
      });
    }

    if('storyId' in msg && msg.storyId) {
      fd.append('storyId', msg.storyId);
    }

    // TODO: check, should be FormData
    await this.http.request<void>(
      `/api/chats/${msg.chatId}/messages`,
      { method: 'POST', body: fd },
    );
  }

  async fetchMessagesByChat({ chatId, cursor, limit }: { chatId: string, cursor?: string | null, limit?: number }) {
    return await this.http.request<PaginatedResponse<MessageDto>>(
      `/api/chats/${chatId}/messages`,
      { method: 'GET', params: { cursor, limit } },
    );
  }

  /* ------------------------------------------------------------------ */
  /*                         ---- Observables ----                      */
  /* ------------------------------------------------------------------ */

  onNewMessage(): Observable<MessageDto> {
    return this.message$.asObservable()
  }

  onTyping(chatId: string | null): Observable<{ chatId: string; user: string; isTyping: boolean }> {
    return this.typing$.pipe(
      filter(t => t.chatId === chatId),
      shareReplay(1)
    );
  }
}