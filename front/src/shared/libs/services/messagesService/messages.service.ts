import { Observable, shareReplay, Subject } from 'rxjs';
import type {
  MessageToSend,
  MsgWithAttachmentsToSend,
  MsgWithGeoToSend,
  MsgWithPollToSend, MsgWithStoryToSend
} from '../../../types/message.types.ts';
import { Socket } from 'socket.io-client';
import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';
import {
  MessageRequestEvents,
  MessageServerEvents
} from './message.events.ts';
import type { MessageDto, PaginatedResponse, MessageNotification } from '../../../types';
import { filter } from 'rxjs';

export class MessagesService {
  private readonly message$ = new Subject<MessageDto>();
  private readonly msgNotification$ = new Subject<MessageNotification>();
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
      this.socket = this.wsService.socket;
      this.offEvents()
      this.registerEvents()
    })
  }

  private registerEvents(){
    /* events from Server → Subject */
    const socket = this.socket
    if(!socket) throw this.wsService.callNoConnectionError()
    socket.on(MessageServerEvents.NOTIFICATION,         (m: MessageNotification) => this.msgNotification$.next(m));
    socket.on(MessageServerEvents.NEW,         (m: MessageDto) => this.message$.next(m));
    socket.on(MessageServerEvents.TYPING,      (t) => this.typing$.next(t));
  }

  private offEvents() {
    const socket = this.socket
    if(!socket) return;
    socket.off(MessageServerEvents.NOTIFICATION)
    socket.off(MessageServerEvents.NEW)
    socket.off(MessageServerEvents.TYPING)
  }

  wsSend(chatId: string, text: string): void    { this.socket?.emit(MessageRequestEvents.SEND,    { chatId, text }); }
  wsTyping(chatId: string, isTyping: boolean): void { this.socket?.emit(MessageRequestEvents.TYPING, { chatId, isTyping }); }

  /** POST /api/chats/:id/messages  MessageToSend */
  async sendMessage(msg: MessageToSend & { chatId: string }): Promise<void> {
    console.log('sendMessage - msg:', msg);
    const body: MessageToSend = { text: msg.text }
    if('geo' in msg && msg.geo) {
      (body as MsgWithGeoToSend).geo = JSON.stringify(msg.geo);
    }

    if('poll' in msg && msg.poll) {
      (body as MsgWithPollToSend).poll = JSON.stringify(msg.poll);
    }

    if('attachments' in msg && msg.attachments) {
      (body as MsgWithAttachmentsToSend).attachments = msg.attachments;
    }

    if('storyId' in msg && msg.storyId) {
      (body as MsgWithStoryToSend).storyId = msg.storyId;
    }

    // TODO: check, should be FormData
    await this.http.request<void>(
      `/api/chats/${msg.chatId}/messages`,
      { method: 'POST', body },
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

  // global
  onMsgNotification(): Observable<MessageNotification> {
    return this.msgNotification$.pipe(
      shareReplay(1)
    );
  }

  // local
  onMessage(chatId: string | null): Observable<MessageDto> {
    return this.message$.pipe(
      filter(t => t.chatId === chatId),
      shareReplay(1)
    );
  }

  onTyping(chatId: string | null): Observable<{ chatId: string; user: string; isTyping: boolean }> {
    return this.typing$.pipe(
      filter(t => t.chatId === chatId),
      shareReplay(1)
    );
  }
}