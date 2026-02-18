export const getSessionExpireAt = () => {
  return new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days
};
