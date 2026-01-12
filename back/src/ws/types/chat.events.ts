export enum ChatRequestEvents {
  CREATE = 'chat:create',
  REMOVE_MEMBER = 'chat:removeMemberRequest',
  LEAVE = 'chat:leave',
  JOIN = 'chat:join',
  DELETE = 'chat:delete',
  ENTER = 'chat:enter', // user open chat
}

export enum ChatServerEvents {
  CREATED = 'chat:created',
  DELETED = 'chat:deleted',
  NEW_MEMBER = 'chat:newMember',
  MEMBER_REMOVED = 'chat:memberRemoved', // another member
  REMOVED_FROM_CHAT = 'chat:removedFromChat', // current user is forced removed
  LEFT = 'chat:left', // current user left by its own
  UNREAD_SYNC = 'chat:unread:sync', // clear unread counts
  UNREAD_BATCH = 'chat:unread:batch', // send batch counts of unread msgs
}
