export enum ChatRequestEvents {
  CREATE = 'chat:create',
  REMOVE_MEMBER = 'chat:removeMemberRequest',
  LEAVE = 'chat:leave',
  JOIN = 'chat:join',
  DELETE = 'chat:delete',
}

export enum ChatServerEvents {
  CREATED = 'chat:created',
  DELETED = 'chat:deleted',
  MEMBERS_UPDATED = 'chat:membersUpdated',
  NEW_MEMBER = 'chat:newMember',
  MEMBER_REMOVED = 'chat:memberRemoved', // another member
  REMOVED_FROM_CHAT = 'chat:removedFromChat', // current user is forced removed
  LEFT = 'chat:left', // current user left by its own
}

export enum MessageRequestEvents {
  SEND = 'msg:send',
  TYPING = 'msg:isTyping:client',
}

export enum MessageServerEvents {
  NEW = 'msg:new',
  CREATED = 'msg:created',
  UPDATED = 'msg:updated',
  DELETED = 'msg:deleted',
  TYPING = 'msg:isTyping',
}
