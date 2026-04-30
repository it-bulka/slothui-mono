# Notifications API

> Base path: `/api/notifications` | All endpoints require **Bearer JWT**.

New notifications are also pushed in real-time via the `notification:new` WebSocket event. See [WebSocket Events](../websocket/events.md).

---

## GET /notifications?cursor=&limit=

Get a paginated list of notifications for the authenticated user.

**Query params:** `cursor`, `limit` (default: server-defined)

**Response 200:**
```json
{
  "items": [
    {
      "id": "uuid",
      "type": "like",
      "createdAt": "2025-10-06T12:00:00Z",
      "read": false,
      "actor": { "id": "uuid", "username": "jane_smith", "nickname": "Jane Smith", "avatarUrl": "..." },
      "entityId": "uuid-post",
      "entityTitle": "My first post",
      "meta": {}
    }
  ],
  "nextCursor": "eyJpZCI6IjEyMyJ9"
}
```

**Notification types:** `like`, `follow`, `comment`, `system`

---

## GET /notifications/unread-count

Get the count of unread notifications.

**Response 200:** `{ "count": 5 }`

---

## POST /notifications/mark-all-read

Mark all notifications as read.

**Response 200:** Success confirmation

---

## POST /notifications/:id/read

Mark a single notification as read.

**Path params:** `id` — notification UUID

**Response 200:** Updated notification

---

## NotificationResponseDto shape

```json
{
  "id": "uuid",
  "type": "like",
  "createdAt": "2025-10-06T12:00:00Z",
  "read": false,
  "actor": { "id": "uuid", "username": "jane_smith", "nickname": "Jane Smith", "avatarUrl": null },
  "entityId": "uuid-post",
  "entityTitle": "My first post",
  "meta": {}
}
```
