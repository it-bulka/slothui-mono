export interface UserState {
  id: string;
  username: string;
  nickname: string;
  email?: string;
  avatarUrl?: string | null;
  bio?: string | null;
  // stats
  postsCount: number
  followersCount: number
  followeesCount: number
}
export interface AuthUserState {
  data: UserState | null;
  isToken: boolean;
  isLoading: boolean;
  error: string | null;
}