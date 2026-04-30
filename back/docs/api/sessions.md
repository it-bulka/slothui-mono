# Sessions API

> Base path: `/api/sessions` | All endpoints require **Bearer JWT**.

Sessions correspond to individual device logins. Each login creates a refresh token bound to a specific session. Managing sessions allows users to see and terminate active logins on other devices.

---

## GET /sessions

Get all active sessions for the authenticated user.

**Response 200:**
```json
[
  {
    "id": "uuid-session",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    "ip": "192.168.1.1",
    "device": "Desktop",
    "os": "Windows 11",
    "browser": "Chrome 118",
    "location": "Kyiv, Ukraine",
    "isCurrent": true
  }
]
```

The session that matches the current `refresh_token` cookie is marked as `isCurrent`.

---

## DELETE /sessions/:sessionId

Invalidate a specific session (log out from a device).

**Path params:** `sessionId` — session UUID

**Response:** `204 No Content`
