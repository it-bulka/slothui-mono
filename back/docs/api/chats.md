# Chats API

> Base path: `/api/chats` | All endpoints require **Bearer JWT**.

> **Note:** Chat creation, deletion, and member changes also emit WebSocket events. See [WebSocket Events](../websocket/events.md).

---

## POST /chats

Create a new chat (private or group).

**Request body:**
```json
{
  "members": ["uuid-user-1", "uuid-user-2"],
  "type": "group",
  "username": "Dev Team",
  "visibility": "public"
}
```

| Field | Required                           | Description |
|---|------------------------------------|---|
| `members` | +                                  | Min 2 user UUIDs (the creator is added automatically) |
| `type` | +                                  | `"private"` or `"group"` |
| `username` | required for group with 3+ members | Group name |
| `visibility` | required for group                 | `"private"` or `"public"` |

**Response 201:** `ChatDetailsDTO`  
Also emits `chat:created` WebSocket event to all members.

---

## GET /chats

Get all chats the authenticated user is a member of.

**Response 200:** List of `ChatListItemDTO` with last message and member info

---

## GET /chats/search/global?search=&limit=

Global search across public chats and users.

**Query params:** `search` (required), `limit` (optional)

**Response 200:** Mixed list of `{ type: 'chat', chat: ChatGlobalDTO } | { type: 'user', user: ChatMemberDTO }`

---

## GET /chats/search/my?search=&limit=

Search within the authenticated user's own chats.

**Query params:** `search` (required), `limit` (optional)

---

## GET /chats/private/:userId

Find or create a private chat with a specific user.

**Path params:** `userId` — the other user's UUID

**Response 200:** `ChatDetailsDTO` (existing or newly created)

---

## DELETE /chats/:id

Delete a chat (owner only).

**Path params:** `id` — chat UUID

**Response 200:** `{ chat: ChatDetailsDTO, deleted: true }`  
Also emits `chat:deleted` WebSocket event to all members.

---

## PATCH /chats/:id/members

Add or remove members from a group chat.

**Path params:** `id` — chat UUID

**Request body:**
```json
{
  "add": ["uuid-user-3"],
  "remove": ["uuid-user-2"]
}
```

At least one of `add` or `remove` must be non-empty.

---

## POST /chats/:chatId/read

Mark all messages in a chat as read (resets unread counter).

**Path params:** `chatId` — chat UUID

**Response 200:** Updated unread state

---

## ChatListItemDTO shape

```json
{
  "id": "uuid",
  "name": "Dev Team",
  "avatarUrl": null,
  "lastMessage": { "id": "uuid", "text": "Hello!", "createdAt": "2025-10-06T12:30:00Z" },
  "membersCount": 3,
  "isPrivate": false,
  "anotherMember": null,
  "updatedAt": "2025-10-06T12:30:00Z",
  "isMember": true
}
```
