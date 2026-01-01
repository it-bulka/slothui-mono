export enum CommentSocketEvents {
  // Server → Client
  COMMENT_CREATED = 'comment:created',
  COMMENT_UPDATED = 'comment:updated',
  COMMENT_DELETED = 'comment:deleted',
  REPLY_CREATED = 'reply:created',
  REPLY_UPDATED = 'reply:updated',
  REPLY_DELETED = 'reply:deleted',

  // Client → Server
  SUBSCRIBE_COMMENT = 'subscribe:comment',
  UNSUBSCRIBE_COMMENT = 'unsubscribe:comment',
  SUBSCRIBE_POST = 'subscribe:post', // for all comments of post
  UNSUBSCRIBE_POST = 'unsubscribe:post',
}