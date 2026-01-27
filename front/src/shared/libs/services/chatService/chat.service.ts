import { Subject } from 'rxjs';
import type { MessageDTO, ChatDTO, ChatGlobalSearchResult } from '../../../types/chat.types.ts';
import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';
import { ChatRequestEvents, ChatServerEvents } from './event.types.ts';
import { Socket } from 'socket.io-client';
import type { PaginatedResponse } from '@/shared/types';

export class ChatService {
  /** Multicast streams */
  private readonly chatCreated$ = new Subject<ChatDTO>();
  private readonly membersUpdated$ = new Subject<{ chatId: string; members: string[] }>();
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
      this.joinChatAfterReconnection()
    })
  }

  /* ------------------------------------------------------------------ */
  /*                       ---- REST over fetch ----                    */
  /* ------------------------------------------------------------------ */

  /** GET /api/chats */
  async listChats(): Promise<PaginatedResponse<ChatDTO>> {
    const res = await this.http.request<PaginatedResponse<ChatDTO>>('/api/chats');
    return res;
  }

  async search(name: string): Promise<ChatDTO[]> {
    const res = await this.http.request<{ items: ChatDTO[] }>(`/api/chats?search=${name}`);
    return res.items;
  }

  async globalSearch(name: string, options?: { signal?: AbortSignal }): Promise<ChatGlobalSearchResult> {
    const res = await this.http.request<ChatGlobalSearchResult>(
      `/api/chats/global?search=${name}`,
      { signal: options?.signal }
    );
    return res;
  }

  /** GET /api/chats/:id/messages?cursor&limit=50 */
  async listMessages(chatId: string, cursor?: string): Promise<MessageDTO[]> {
    const res = await this.http.request<{ items: MessageDTO[] }>(
      `/api/chats/${chatId}/messages`,
      { params: { cursor, limit: 50 } },
    );
    return res.items;
  }

  /** PATCH /api/chats/:id/members */
  async updateMembers(chatId: string, add: string[] = [], remove: string[] = []) {
    await this.http.request<void>(
      `/api/chats/${chatId}/members`,
      {
        method: 'PATCH',
        body: { add, remove },
      },
    );
  }

  /** POST /api/chats { members, name? } */
  async createChat(members: string[], name?: string): Promise<ChatDTO> {
    return this.http.request<ChatDTO>(
      '/api/chats',
      { method: 'POST', body: { members, name } },
    );
  }

  /** GET /api/chats/private/:userId */
  async findChatByMember(userId: string): Promise<{ chatId: string }> {
    return this.http.request<{ chatId: string }>(
      `/api/chats/private/${userId}`,
    );
  }

  /* ------------------------------------------------------------------ */
  /*                  ---- WebSocket via socket.io ----                 */
  /* ------------------------------------------------------------------ */
  private registerEvents(){
    /* events from Server → Subject */
    const socket = this.socket
    if(!socket) throw this.wsService.callNoConnectionError()
    socket.on(ChatServerEvents.CREATED,        (c: ChatDTO) => this.chatCreated$.next(c));
    socket.on(ChatServerEvents.MEMBERS_UPDATED, (u) => this.membersUpdated$.next(u));
  }

  private offEvents() {
    const socket = this.socket
    if(!socket) return;
    socket.off(ChatServerEvents.CREATED)
    socket.off(ChatServerEvents.MEMBERS_UPDATED)
  }

  private readonly joinedChats = new Set<string>();

  joinChat(chatId: string)  {
    this.joinedChats.add(chatId);
    this.socket?.emit(ChatRequestEvents.JOIN, { chatId });
  }

  private joinChatAfterReconnection() {
    const socket = this.socket
    if(!socket) return;

    for (const chat of this.joinedChats) {
      socket.emit('join', { chatId: chat });
    }
  }

  leaveChat(chatId: string) {
    this.joinedChats.delete(chatId);
    this.socket?.emit(ChatRequestEvents.LEAVE, { chatId });
  }

  /* ------------------------------------------------------------------ */
  /*                         ---- Observables ----                      */
  /* ------------------------------------------------------------------ */

  onChatCreated() {
    return this.chatCreated$.asObservable();
  }

  onMembersUpdated() {
    return this.membersUpdated$.asObservable();
  }

}