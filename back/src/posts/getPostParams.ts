export interface GetPostsParams {
  userId?: string; // currenUserIdfor (для isLiked/isSaved)
  targetUserId?: string; // for other user
  friendsIds?: string[];
  onlyMe?: boolean;
  cursor?: string;
  limit?: number;
  random?: boolean;
}
