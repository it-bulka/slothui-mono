# Events API

> Base path: `/api/events` | All endpoints require **Bearer JWT**.

---

## GET /events?cursor=&limit=

Get a paginated list of all events.

**Query params:** `cursor`, `limit` (default: 50)

**Response 200:** Paginated list of `EventResponseDto`

---

## POST /events

Create a new event.

**Request body:**
```json
{
  "title": "Tech Meetup 2025",
  "description": "Monthly gathering of local developers.",
  "date": "2025-09-15T18:00:00.000Z",
  "location": {
    "address": "123 Main St",
    "latitude": 50.4501,
    "longitude": 30.5234,
    "city": "Kyiv",
    "country": "Ukraine"
  },
  "category": "business",
  "onlineUrl": "https://meet.google.com/abc-defg-hij"
}
```

| Field         | Required | Notes |
|---------------|----------|---|
| `title`       |  +       | Max 255 chars |
| `description` | +        | Max 5000 chars |
| `date`        | +        | ISO 8601 string |
| `location`    | -        | Nested object with lat/lng |
| `category`    | -        | Enum: `music`, `sport`, `business`, `dating`, `travel`, `party` |
| `onlineUrl`   | -        | Valid URL for online events |

**Response 201:** `CreatedEvent`

---

## GET /events/subscribed

Get events the authenticated user has subscribed to.

**Response 200:** List of `EventResponseDto`

---

## GET /events/upcoming?cursor=

Get upcoming events starting from now.

**Response 200:** Paginated list of future events

---

## GET /events/organized?userId=

Get events organized by a specific user.

**Query params:** `userId` — organizer UUID

---

## GET /events/:id

Get a single event by ID, including subscription status.

**Response 200:** `EventResponseDto`  
**Response 404:** Event not found

---

## DELETE /events/:id

Delete an event (organizer only).

**Response 200:** `{ message: 'Event deleted successfully' }`

---

## POST /events/:id/subscribe

Subscribe to an event.

**Response 200:** `{ message: 'User subscribed successfully' }`

---

## DELETE /events/:id/unsubscribe

Unsubscribe from an event.

**Response 200:** `{ message: 'User unsubscribe successfully' }`

---

## GET /events/:id/participants?pageSize=&cursor=

Get a paginated list of event participants.

**Query params:** `pageSize` (default: server-defined), `cursor`

---

## EventResponseDto shape

```json
{
  "id": "uuid",
  "title": "Tech Meetup 2025",
  "description": "Monthly gathering...",
  "date": "2025-09-15T18:00:00.000Z",
  "location": { "address": "123 Main St", "latitude": 50.4501, "longitude": 30.5234, "city": "Kyiv", "country": "Ukraine" },
  "category": "business",
  "coverUrl": null,
  "onlineUrl": "https://meet.google.com/abc-defg-hij",
  "organizer": { "id": "uuid", "username": "john_doe", "nickname": "John Doe", "avatar": null },
  "participantsCount": 42,
  "isSubscribed": false,
  "createdAt": "2025-08-01T10:00:00Z"
}
```
