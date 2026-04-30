# Comments API

> Base path: `/api` | Most endpoints require **Bearer JWT**.

---

## GET /posts/:postId/comments

Get top-level comments for a post. **Public — no auth required.**

**Path params:** `postId` — post UUID  
**Query params:** `cursor` — pagination cursor

**Response 200:** Paginated list of `CommentListItemDTO`

---

## POST /comments

Create a comment on a post, or reply to an existing comment.

**Auth:** Required

**Request body:**
```json
{
  "postId": "uuid-post",
  "parentId": "uuid-parent-comment",
  "text": "Great post!"
}
```

- `parentId` is optional — omit for top-level comments, set for replies
- `parentId` must be a valid UUID of an existing comment

**Response 201:** Created `CommentListItemDTO`

---

## GET /comments/:id/replies

Get all replies to a comment.

**Path params:** `id` — parent comment UUID

**Response 200:** List of reply `CommentListItemDTO`

---

## PATCH /comments/:id

Edit a comment's text (author only).

**Path params:** `id` — comment UUID

**Request body:**
```json
{ "text": "Edited comment text" }
```

**Response 200:** Updated comment

---

## DELETE /comments/:id

Delete a comment (author only).

**Path params:** `id` — comment UUID  
**Response:** `204 No Content`

---

## CommentListItemDTO shape

```json
{
  "id": "uuid",
  "postId": "uuid",
  "text": "Great post!",
  "parentId": null,
  "author": { "id": "uuid", "username": "john_doe", "nickname": "John Doe", "avatarUrl": "..." },
  "repliesCount": 2,
  "createdAt": "2025-10-06T12:00:00Z",
  "editedAt": null,
  "isEdited": false
}
```
