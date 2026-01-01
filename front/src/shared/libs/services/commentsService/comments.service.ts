import { Subject } from 'rxjs';
import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';
import type { CommentsPaginated, Comment } from '../../../types';
import { CommentSocketEvents } from './comments.events.ts';

import { Socket } from 'socket.io-client';

import type {
  CreateCommentDTO,
  EditedCommentDTO, EditCommentDto,
  GetCommentDto, GetReplyDto
} from '@/shared/libs/services/commentsService/comments.type.ts';

export class CommentsService {
  /** Multicast streams */
  private commentCreated$ = new Subject<Comment>();
  private replyCreated$ = new Subject<Comment>();

  private joinedComments = new Set<string>();

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

  /* ------------------------------------------------------------------ */
  /*                       ---- REST over fetch ----                    */
  /* ------------------------------------------------------------------ */

  // COMMENTS
  /** GET /api/posts/:postId/comments  */
  async fetchPostComments({ postId }: GetCommentDto): Promise<CommentsPaginated> {
    return await this.http.request<CommentsPaginated>(`/api/posts/${postId}/comments`);
  }

  /** POST /api/comments  */
  async createComment({ text, postId, parentId }: CreateCommentDTO): Promise<Comment> {
    return await this.http.request<Comment>('/api/comments', {
      method: 'POST',
      body: { text, postId, parentId }
    });
  }

  /** DELETE /api/comments/:commentId  */
  async deleteComment(commentId: string): Promise<void> {
    await this.http.request<CommentsPaginated>(`/api/comments/${commentId}`, {
      method: 'DELETE'
    });
  }

  /** PATCH /api/comments/:commentId  */
  async editComment({ text, commentId }: EditCommentDto): Promise<EditedCommentDTO> {
    return await this.http.request<EditedCommentDTO>(`/api/comments/${commentId}`, {
      method: 'PATCH',
      body: { text }
    });
  }


  // REPLIES
  /** GET /api/comments/:commentId/replies  */
  async fetchReplies({ parentId: commentId, cursor }: GetReplyDto): Promise<CommentsPaginated> {
    return await this.http.request<CommentsPaginated>(
      `/api/comments/${commentId}/replies?cursor=${cursor}`,
      { }
    );
  }

  /* ------------------------------------------------------------------ */
  /*                  ---- WebSocket via socket.io ----                 */
  /* ------------------------------------------------------------------ */
  private registerEvents(){
    /* events from Server → Subject */
    const socket = this.socket
    if(!socket) throw this.wsService.callNoConnectionError()
}

  private offEvents() {
    const socket = this.socket
    if(!socket) return;
    socket.off(CommentSocketEvents.COMMENT_CREATED);
    socket.off(CommentSocketEvents.REPLY_CREATED);
  }

  /** Join a comment room */
  joinComment(commentId: string) {
    if (!this.socket) return;
    this.joinedComments.add(commentId);
    this.socket.emit(CommentSocketEvents.SUBSCRIBE_COMMENT, { commentId });
  }

  /** Leave a comment room */
  leaveComment(commentId: string) {
    if (!this.socket) return;
    this.joinedComments.delete(commentId);
    this.socket.emit(CommentSocketEvents.UNSUBSCRIBE_COMMENT, { commentId });
  }

  /** Rejoin rooms after reconnect */
  rejoinComments() {
    if (!this.socket) return;
    for (const commentId of this.joinedComments) {
      this.socket.emit(CommentSocketEvents.SUBSCRIBE_COMMENT, { commentId });
    }
  }

  /* ------------------------------------------------------------------ */
  /*                         ---- Observables ----                      */
  /* ------------------------------------------------------------------ */

  onCommentCreated() {
    return this.commentCreated$.asObservable();
  }

  onReplyCreated() {
    return this.replyCreated$.asObservable();
  }
}