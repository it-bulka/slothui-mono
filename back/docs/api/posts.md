# Posts API

> Base path: `/api/posts` | All endpoints require **Bearer JWT**.

---

## GET /posts

Get paginated post feed.

**Query params:**
| Param | Type | Description |
|---|---|---|
| `cursor` | string | Pagination cursor |
| `limit` | number | Default: 100 |
| `userId` | string (UUID) | Filter posts by a specific author |

**Response 200:** Paginated list of `PostDto`

---

## GET /posts/my

Get the authenticated user's own posts.

**Query params:** `cursor`, `limit` (default: 50)

---

## GET /posts/liked

Get posts the authenticated user has liked.

**Query params:** `cursor`, `limit` (default: 50)

---

## GET /posts/saved

Get posts the authenticated user has saved.

**Query params:** `cursor`, `limit` (default: 50)

---

## GET /posts/:id

Get a single post by ID.

**Response 200:** `PostDto`  
**Response 404:** Post not found

---

## POST /posts

Create a new post. Supports three types: **text**, **files**, or **poll**.

**Content-Type:** `multipart/form-data`

**Request body:**
| Field | Type | Description |
|---|---|---|
| `text` | string | Post text content |
| `files` | binary[] | Up to 25 files, max 10MB each |
| `poll` | string (JSON) | Serialized `CreatePollDto` — mutually exclusive with `files` |

The server infers the post type automatically:
- `poll` field present → poll post
- `files` present → media post
- only `text` → text post

**Response 201:** Created `PostDto`  
**Response 400:** No valid data provided

---

## DELETE /posts/:id

Delete a post (author only).

**Response:** `200` with deleted post ID

---

## PUT /posts/:id/likes

Like a post.

**Response 200:**
```json
{ "postId": "uuid", "isLiked": true, "likeCounts": 42 }
```

---

## DELETE /posts/:id/likes

Unlike a post.

**Response 200:**
```json
{ "postId": "uuid", "isLiked": false, "likeCounts": 41 }
```

---

## PUT /posts/:id/saves

Save a post.

**Response 200:**
```json
{ "postId": "uuid", "isSaved": true, "saveCounts": 7 }
```

---

## DELETE /posts/:id/saves

Unsave a post.

**Response 200:**
```json
{ "postId": "uuid", "isSaved": false, "saveCounts": 6 }
```

---

## PostDto shape

```json
{
  "id": "uuid",
  "text": "Hello world!",
  "author": { "id": "uuid", "username": "john_doe", "nickname": "John Doe", "avatarUrl": "..." },
  "isLiked": false,
  "isSaved": false,
  "likesCount": 42,
  "commentsCount": 5,
  "attachments": [...],
  "poll": null
}
```
