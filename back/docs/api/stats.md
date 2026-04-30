# Stats API

> Base path: `/api/stats` | All endpoints require **Bearer JWT**.

---

## GET /stats/counters

Get real-time activity counters for the authenticated user.

Used to display badge numbers in the UI (unread messages, notifications, new followers, etc.).

**Response 200:**
```json
{
  "unreadMessages": 3,
  "unreadNotifications": 5,
  "newFollowers": 1
}
```

---

## GET /stats/friends

Get follower and following counts for the authenticated user.

**Response 200:**
```json
{
  "followersCount": 128,
  "followingCount": 74
}
```
