export const CACHE_KEYS = {
  user: (id: string) => `user:${id}`,
  userShort: (id: string) => `user:short:${id}`,
  userProfile: (id: string) => `user:profile:${id}`,
  userSearch: (query: string) => `user:search:${query}`,

  posts: (userId: string, cursor: string) => `posts:feed:${userId}:${cursor}`,
  post: (id: string) => `post:${id}`,
  postCount: (userId: string) => `posts:count:${userId}`,

  comments: (postId: string, cursor: string) => `comments:${postId}:${cursor}`,
  commentReplies: (parentId: string, cursor: string) =>
    `comments:replies:${parentId}:${cursor}`,

  poll: (id: string) => `poll:${id}`,
  pollVoters: (pollId: string, answerId: string) =>
    `poll:voters:${pollId}:${answerId}`,

  followerCount: (userId: string) => `followers:count:${userId}`,
  followeeCount: (userId: string) => `followees:count:${userId}`,
  followRelation: (userId: string, targetId: string) =>
    `follow:relation:${userId}:${targetId}`,
  suggestions: (userId: string) => `follow:suggestions:${userId}`,

  stats: (userId: string) => `stats:analytics:${userId}`,

  chats: (userId: string, cursor: string) => `chats:${userId}:${cursor}`,
  chatMembers: (chatId: string) => `chat:members:${chatId}`,

  stories: (userId: string) => `stories:user:${userId}`,

  event: (id: string) => `event:${id}`,
  eventCount: (id: string) => `event:participants:count:${id}`,

  attachments: (parentType: string, parentId: string) =>
    `attachments:${parentType}:${parentId}`,

  notifUnread: (userId: string) => `notif:unread:${userId}`,
};
