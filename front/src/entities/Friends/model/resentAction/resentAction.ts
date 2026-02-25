/**
 * RecentFriendActionsManager — singleton to coordinate optimistic updates and WebSocket events
 *
 * Purpose:
 * - Prevents duplicate actions (follow/unfollow) when the same operation happens both
 *   through the UI (optimistic update) and via an incoming WebSocket event.
 * - Stores recently performed actions in a Map with timestamps.
 * - Allows checking if an action can be applied again (using TTL) to avoid “stuck” or frozen updates.
 *
 * Usage:
 * - Before performing an optimistic update, check if the action was recently executed:
 *      isUnfollowRecent(actorId, targetId, ttlMs)
 * - After performing an optimistic action or receiving a WS event, mark the action:
 *      markUnfollow(actorId, targetId)
 * - Optionally, clear the record after processing the WS event:
 *      clearUnfollow(actorId, targetId)
 *
 * Benefits:
 * - Avoids duplicate state changes (e.g., decreaseFollowersCount firing twice)
 * - Minimizes side effects in Redux reducers
 * - Works per user even across multiple tabs
 *
 * Notes:
 * - TTL should be long enough to allow the WS event to arrive.
 * - Does not store data in Redux — operates as a local frontend manager.
 */
export class ResentFriendActionsManager {
  private static instance: ResentFriendActionsManager | null = null;

  resentUnfollow = new Map<string, number>() // <actorId:targetId, timeout>
  resentFollow = new Map<string, number>() // <actorId:targetId, timeout>

  defaultTtlMs = 5000

  private constructor() {
  }

  static getInstance() {
    if(!ResentFriendActionsManager.instance) {
      ResentFriendActionsManager.instance = new ResentFriendActionsManager();
    }

    return ResentFriendActionsManager.instance
  }

  private getKey(actorId: string, targetId: string) {
    return `${actorId}:${targetId}`;
  }

  // UNFOLLOW //
  markUnfollow(actorId: string, targetId: string) {
    this.resentUnfollow.set(this.getKey(actorId, targetId), Date.now());
  }

  isUnfollowRecent(actorId: string, targetId: string, ttlMs: number = this.defaultTtlMs) {
    const key = this.getKey(actorId, targetId);
    const timestamp = this.resentUnfollow.get(key);
    if (!timestamp) return false;

    if (Date.now() - timestamp > ttlMs) {
      this.resentUnfollow.delete(key);
      return false;
    }
    return true;
  }

  clearUnfollow(actorId: string, targetId: string) {
    this.resentUnfollow.delete(this.getKey(actorId, targetId));
  }

  // FOLLOW //
  markFollow(actorId: string, targetId: string) {
    this.resentFollow.set(this.getKey(actorId, targetId), Date.now());
  }

  isFollowRecent(actorId: string, targetId: string, ttlMs: number = this.defaultTtlMs) {
    const key = this.getKey(actorId, targetId);
    const timestamp = this.resentFollow.get(key);
    if (!timestamp) return false;
    if (Date.now() - timestamp > ttlMs) {
      this.resentFollow.delete(key);
      return false;
    }
    return true;
  }

  clearFollow(actorId: string, targetId: string) {
    this.resentFollow.delete(this.getKey(actorId, targetId));
  }
}

export const resentFriendsActions = ResentFriendActionsManager.getInstance()