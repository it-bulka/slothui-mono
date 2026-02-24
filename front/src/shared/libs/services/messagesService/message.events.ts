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