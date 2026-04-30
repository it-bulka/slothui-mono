# Stories API

> Base path: `/api/stories` | All endpoints require **Bearer JWT**.

Stories are ephemeral media (image or video) that expire after 24 hours.

---

## POST /stories

Upload a new story.

**Content-Type:** `multipart/form-data`

**Request body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | binary | + | Image or video file |

**Response 201:** `StoryDto`

---

## GET /stories

Get users who have active (non-expired) stories. Optionally filter by author IDs.

**Request body (optional):**
```json
{ "authorsIds": ["uuid-user-1", "uuid-user-2"] }
```

**Query params:** `cursor`, `limit`

**Response 200:** Paginated list of `UserWithStory`

---

## GET /stories/users/me

Get the authenticated user's own stories.

**Response 200:** List of `StoryDto`

---

## GET /stories/users/:userId

Get stories for a specific user.

**Path params:** `userId` — target user UUID

**Response 200:** List of `StoryDto`

---

## DELETE /stories/:storyId

Delete a story (author only).

**Path params:** `storyId` — story UUID  
**Response 200** (no body)

---

## POST /stories/viewed

Mark multiple stories as viewed in a single batch request.

**Request body:**
```json
["uuid-story-1", "uuid-story-2"]
```

**Response:** `204 No Content`

---

## GET /stories/:storyId/views

Get a paginated list of users who viewed a story.

**Path params:** `storyId` — story UUID  
**Query params:** `cursor`, `limit`

---

## POST /stories/:storyId/views

Mark a single story as viewed.

**Path params:** `storyId` — story UUID  
**Response:** `204 No Content`

---

## StoryDto shape

```json
{
  "id": "uuid",
  "url": "https://res.cloudinary.com/...",
  "publicId": "slothui/stories/abc123",
  "type": "image",
  "duration": null,
  "createdAt": "2025-10-06T12:00:00Z"
}
```

## UserWithStory shape

```json
{
  "id": "uuid",
  "username": "john_doe",
  "nickname": "John Doe",
  "avatarUrl": "https://...",
  "lastStoryDate": "2025-10-06T12:00:00Z",
  "totalStories": 3,
  "viewedStories": 1,
  "hasUnseen": true
}
```
