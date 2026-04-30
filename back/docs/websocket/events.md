# WebSocket Events

> **Endpoint:** `ws://localhost:3000/ws`  
> **Protocol:** Socket.io (over WebSocket)  
> **Auth:** Pass JWT in `socket.handshake.auth.token`  
> **Interactive docs:** `http://localhost:3000/docs` (AsyncAPI HTML)

---

## Connection & Rooms

On successful connection, the server automatically:

1. Authenticates the JWT from `socket.handshake.auth.token`
2. Adds the socket to the user's personal room: `user:{userId}`
3. Adds the socket to all chats the user is a member of: `chat:{chatId}`

---

## Event Direction

| Symbol | Meaning                                        |
|---|------------------------------------------------|
| `→` | Client → Server (client emits, server handles) |
| `←` | Server → Client (server emits, client listens) |

---

## Chat Events

| Event                      | Direction | Auth   | Description                                                |
|----------------------------|---|--------|------------------------------------------------------------|
| `chat:create`              | → | User   | Create a new chat                                          |
| `chat:delete`              | → | Owner  | Delete a chat                                              |
| `chat:join`                | → | User   | Join a public group chat                                   |
| `chat:leave`               | → | Member | Leave a chat                                               |
| `chat:removeMemberRequest` | → | Owner  | Remove a member from chat                                  |
| `chat:enter`               | → | Member | Inform server that chat is currently open                  |
| `chat:created`             | ← | —      | Broadcast to all members after creation                    |
| `chat:deleted`             | ← | —      | Sent to `user:{userId}` rooms of all members               |
| `chat:newMember`           | ← | —      | Broadcast to chat room                                     |
| `chat:left`                | ← | —      | Broadcast to chat room                                     |
| `chat:memberRemoved`       | ← | —      | Broadcast to chat room                                     |
| `chat:removedFromChat`     | ← | —      | Sent to the removed user's socket                          |
| `chat:unread:sync`         | ← | —      | Sent to client after `chat:enter`, resets unread to 0      |
| `chat:unread:batch`        | ← | —      | Sent every ~1s to `user:{userId}` with batch unread counts |

### `chat:create` payload

```json
{
  "members": ["uuid-user-1", "uuid-user-2"],
  "type": "group",
  "username": "Dev Team",
  "visibility": "public"
}
```

### `chat:created` payload

Full `ChatDetailsDTO` object.

### `chat:unread:batch` payload

```json
{
  "userId": "uuid-user",
  "items": [
    { "chatId": "uuid-chat-1", "count": 3 },
    { "chatId": "uuid-chat-2", "count": 1 }
  ]
}
```

---

## Message Events

| Event                   | Direction | Description |
|-------------------------|---|---|
| `msg:isTyping:client`   | → | Client signals typing state |
| `msg:new`               | ← | New message broadcast to chat room |
| `msg:isTyping`          | ← | Typing state broadcast to chat room |

### `msg:isTyping:client` payload

```json
{ "chatId": "uuid-chat", "isTyping": true }
```

### `msg:new` payload

Base fields (always present):
```json
{
  "id": "uuid-msg",
  "chatId": "uuid-chat",
  "text": "Hello!",
  "authorId": "uuid-user",
  "createdAt": "2025-10-06T12:30:00Z"
}
```

Extra fields depending on message type:
- `attachments: Attachment[]` — file messages
- `poll: PollResult` — poll messages
- `geo: { position: [lat, lng], locationName: string }` — location messages

### `msg:isTyping` payload

```json
{
  "chatId": "uuid-chat",
  "isTyping": true,
  "user": { "id": "uuid", "username": "john_doe", "nickname": "John Doe", "avatarUrl": null }
}
```

---

## Follower Events

| Event | Direction | Target Room | Description |
|---|---|---|---|
| `follower:new` | ← | `user:{userId}` | Someone followed the current user |
| `followers:update` | ← | `user:{actorId}` + `user:{targetId}` | An unfollow action occurred |

### `follower:new` payload

```json
{
  "id": "uuid-follower",
  "username": "jane_smith",
  "nickname": "Jane Smith",
  "avatarUrl": "https://..."
}
```

### `followers:update` payload

```json
{
  "actorId": "uuid-unfollower",
  "targetId": "uuid-unfollowed",
  "type": "unfollow"
}
```

---

## Notification Events

| Event              | Direction | Target Room | Description |
|--------------------|-----------|---|---|
| `friend:request`   | ←         | `user:{userId}` | A user sent a follow request |
| `friend:confirmed` | ←         | `user:{userId}` | A follow request was accepted |
| `notification:new` | ←         | `user:{userId}` | Any new in-app notification (likes, comments, system) |

### `friend:request` / `friend:confirmed` payload

Full `UserResponse` object of the actor:
```json
{
  "id": "uuid",
  "username": "jane_smith",
  "nickname": "Jane Smith",
  "role": "user",
  "avatarUrl": "https://...",
  "email": "jane@example.com",
  "bio": null
}
```

### `notification:new` payload

```json
{
  "id": "uuid-notification",
  "type": "like",
  "createdAt": "2025-10-06T12:00:00Z",
  "read": false,
  "actor": { "id": "uuid", "username": "jane_smith", "nickname": "Jane Smith", "avatarUrl": null },
  "entityId": "uuid-post",
  "entityTitle": "My first post",
  "meta": {}
}
```

**Notification types:** `like`, `follow`, `comment`, `system`

---

## Error Handling

If a client-emitted event fails validation or authorization, the server responds with an acknowledge callback:

```json
{ "ok": false, "message": "Forbidden" }
```
