export const WS_PREFIXES = {
  setChatPrefix: (chatId: string) => `chat:${chatId}`,
  setUserPrefix: (userId: string) => `user:${userId}`,
};
