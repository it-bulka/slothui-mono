# Friends (Followers) API

> Base path: `/api/friends` | All endpoints require **Bearer JWT**.

SlothUI uses a directed follow model (like Twitter/Instagram): User A can follow User B without B following back.

---

## POST /friends

Follow a user.

**Request body:**
```json
{ "userId": "uuid-target-user" }
```

**Response 200:** Follow relationship object  
Also emits `follower:new` WebSocket event to the target user.

---

## DELETE /friends/followee/:userId

Unfollow a user.

**Path params:** `userId` — the user to unfollow

**Response 200:** `{ "id": "uuid" }`

---

## DELETE /friends/followers

Remove a follower from your followers list.

**Query params:** `userId` — the follower to remove

**Response 200:** `{ "id": "uuid" }`

---

## POST /friends/confirmation

Accept a follow request.

**Request body:** `userId` (string) — the requester's ID

**Response 200:** Confirmed follow relationship  
Also emits `friend:confirmed` WebSocket event to the requester.

---

## DELETE /friends/confirmation

Reject a follow request.

**Request body:** `userId` — the requester's ID

**Response:** No content

---

## POST /friends/followers/markSeen

Mark all new followers as seen (clears the new-follower badge/counter).

**Response 200:** Current timestamp (number)

---

## GET /friends/followers?userId=&cursor=&limit=

Get a paginated list of a user's followers.

**Query params:**

| Param    | Required | Description |
|----------|----------|---|
| `userId` | +        | Target user UUID |
| `cursor` | -        | Pagination cursor |
| `limit`  | -        | Default: 15 |

**Response 200:** Paginated list of `FriendDto`

---

## GET /friends/followings?userId=&cursor=&limit=

Get a paginated list of users that a user follows.

Same query params as `/friends/followers`.

---

## GET /friends/suggestions?userId=&cursor=&limit=

Get suggested users to follow, based on mutual connections.

**Query params:** `userId`, `cursor`, `limit` (default: 15)

---

## FriendDto shape

```json
{
  "id": "uuid",
  "src": "https://res.cloudinary.com/.../avatar.jpg",
  "username": "jane_smith",
  "nickname": "Jane Smith",
  "isFollowee": true,
  "isFollower": false,
  "createdAt": "2025-10-01T08:00:00Z"
}
```

- `isFollowee: true` — the current user follows this person
- `isFollower: true` — this person follows the current user
