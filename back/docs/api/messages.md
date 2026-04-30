# Messages API

> Base path: `/api` | All endpoints require **Bearer JWT**.

> **Note:** Message creation triggers a `msg:new` WebSocket event broadcast to the chat room. See [WebSocket Events](../websocket/events.md) for details.

---

## GET /chats/:chatId/messages

Get paginated message history for a chat (reverse chronological order).

**Path params:** `chatId` — chat UUID

**Query params:**

| Param | Type | Description |
|---|---|---|
| `cursor` | string | Pagination cursor |
| `limit` | number | Number of messages to return |

**Response 200:** Paginated list of `MessageResponseDto`

---

## POST /chats/:chatId/messages

Send a message to a chat. Supports multiple content types.

**Path params:** `chatId` — chat UUID  
**Content-Type:** `multipart/form-data`

**Request body:**
| Field | Type | Description |
|---|---|---|
| `text` | string | Message text |
| `files` | binary[] | Up to 25 files, max 10MB each |
| `poll` | string (JSON) | Serialized `CreatePollDto` |
| `geo` | string (JSON) | Serialized `CreateGeoMessageDto` — `{ position: [lat, lng], locationName: "..." }` |
| `postId` | UUID | Forward a post |
| `storyId` | UUID | Forward a story |
| `eventId` | UUID | Forward an event |

**Response 201:** `MessageResponseDto`

After creation, the message is broadcast via WebSocket `msg:new` to all chat members.

---

## POST /messages/story-reaction

Send a reaction message to a story author (creates a direct message to the story author).

**Request body:**
```json
{
  "text": "😍",
  "receiverId": "uuid-story-author",
  "storyId": "uuid-story"
}
```

**Response:** `204 No Content`

---

## MessageResponseDto shape

Base fields (always present):
```json
{
  "id": "uuid",
  "chatId": "uuid",
  "text": "Hello!",
  "authorId": "uuid",
  "createdAt": "2025-10-06T12:30:00Z"
}
```

Extended fields depending on message type:
- `attachments: AttachmentDto[]` — file/image/audio/video
- `poll: PollResultDto` — poll message
- `geo: { position: [lat, lng], locationName: string }` — location
- `post: PostSummaryDto` — forwarded post
- `story: StoryInMessageDto` — forwarded story
