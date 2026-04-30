# Users API

> Base path: `/api/users` | All endpoints require **Bearer JWT**.

---

## GET /users/me/profile

Get the authenticated user's full profile and linked OAuth providers.

**Response 200:**
```json
{
  "profile": {
    "id": "uuid",
    "username": "john_doe",
    "nickname": "John Doe",
    "role": "user",
    "avatarUrl": "https://...",
    "email": "john@example.com",
    "bio": "Frontend developer"
  },
  "linkedProviders": ["local", "google"]
}
```

---

## PATCH /users/me/profile

Update the authenticated user's profile.

**Content-Type:** `multipart/form-data`

**Request body (all fields optional):**

| Field          | Type | Description |
|----------------|---|---|
| `username`     | string | 3–20 chars |
| `nickname`     | string | 3–20 chars |
| `bio`          | string | Max 160 chars |
| `avatar`       | binary | New avatar image |
| `removeAvatar` | boolean (string `"true"`) | Pass `"true"` to remove the current avatar |

**Response 200:** Updated `UserResponseDto`

---

## DELETE /users/me/profile

Permanently delete the authenticated user account.

**Response:** `204 No Content`

---

## POST /users/me/change-password

Change the authenticated user's password.

**Request body:**
```json
{
  "oldPassword": "OldPass123!",
  "newPassword": "NewStr0ng!Pass"
}
```

**Response:** `204 No Content`

---

## GET /users/profile-analytics

Get follower growth analytics for the authenticated user.

**Response 200:** Analytics object with growth data over time periods.

---

## GET /users?search=&cursor=&limit=

Search users by username or nickname.

**Query params:**

| Param | Type | Required | Description |
|---|---|----------|---|
| `search` | string | +        | Search term |
| `cursor` | string | -        | Pagination cursor |
| `limit` | number | -        | Default: server-defined |

**Response 200:**
```json
{
  "items": [{ "id": "uuid", "username": "john_doe", "nickname": "John Doe", "avatarUrl": "..." }],
  "nextCursor": "eyJpZCI6IjEyMyJ9"
}
```

---

## GET /users/:userId/profile

Get full profile data for another user (includes follower relationship status).

**Path params:** `userId` — target user UUID

**Response 200:** Full profile with `isFollowing`, `isFollower`, etc.  
**Response 404:** User not found

---

## GET /users/:userId

Get brief user info (id, username, nickname, avatarUrl).

**Path params:** `userId` — target user UUID  
**Response 200:** `UserShortDto`
