# Auth API

> Base path: `/api/auth` | All endpoints are **public** unless noted otherwise.

---

## POST /auth/register

Register a new user with email and password.

**Auth:** Public  
**Content-Type:** `multipart/form-data`

**Request body:**

| Field        | Type      | Required | Description |
|--------------|-----------|----------|---|
| `username`   | string    | +        | Unique username (3–20 chars) |
| `nickname`   | string    | +        | Display name (3–20 chars) |
| `email`      | string    | +        | Valid email address |
| `password`   | string    | +        | Strong password (6–30 chars, uppercase, lowercase, special char) |
| `deviceId`   | string    | +        | Client device identifier for session tracking |
| `avatar`     | binary    | -        | Optional profile photo |

**Response 201:**
```json
{
  "profile": { "id": "uuid", "username": "john_doe", "nickname": "John Doe", "role": "user", "avatarUrl": null, "email": "john@example.com", "bio": null },
  "accessToken": "eyJhbGci...",
  "linkedProviders": ["local"]
}
```

**Errors:** `400` Validation error or email taken

---

## POST /auth/login

Login with email and password.

**Auth:** Public  
**HTTP Code:** 200

**Request body:**
```json
{
  "email": "john@example.com",
  "password": "MyStr0ng!Pass",
  "deviceId": "device-uuid-1234"
}
```

**Response 200:**
```json
{
  "profile": { ... },
  "token": "eyJhbGci...",
  "linkedProviders": ["local", "google"]
}
```
Sets `refresh_token` HTTP-only cookie.

**Errors:** `401` Invalid credentials

---

## GET /auth/refresh

Refresh the access token using the `refresh_token` cookie.

**Auth:** Cookie (`refresh_token`)

**Response 200:**
```json
{ "token": "eyJhbGci..." }
```
Rotates the `refresh_token` cookie.

**Errors:** `401` Missing or expired refresh token

---

## GET /auth/logout

Invalidate the current refresh token and clear the cookie.

**Auth:** Cookie (`refresh_token`)  
**Response:** `204 No Content`

---

## POST /auth/forgot-password

Send a password reset link to the user's email.

**Auth:** Public  
**Response:** `204 No Content` (always, to prevent email enumeration)

**Request body:**
```json
{ "email": "john@example.com" }
```

---

## POST /auth/reset-password

Reset password using the token from the reset email.

**Auth:** Public  
**Response:** `204 No Content`

**Request body:**
```json
{
  "token": "reset-token-from-email",
  "password": "NewStr0ng!Pass"
}
```

**Errors:** `400` Invalid or expired token

---

## OAuth2 Providers

All OAuth flows follow the same two-step pattern:

1. **Initiate:** `GET /auth/{provider}/login` — redirects to the provider's consent page
2. **Callback:** `GET /auth/{provider}/callback?state=...&deviceId=...` — redirects to frontend with access token

| Provider | Login | Callback |
|---|---|---|
| Google | `GET /auth/google/login` | `GET /auth/google/callback` |
| Facebook | `GET /auth/facebook/login` | `GET /auth/facebook/callback` |
| GitHub | `GET /auth/github/login` | `GET /auth/github/callback` |
| Instagram | `GET /auth/instagram/login` | `GET /auth/instagram/callback` |
| Twitter | `GET /auth/twitter/login` | `GET /auth/twitter/callback` |
| LinkedIn | `GET /auth/linkedin/login` | `GET /auth/linkedin/callback` |
| Telegram | `GET /auth/telegram/login` | `GET /auth/telegram/callback` |

**Callback query params:**
- `state` — frontend redirect URL (encoded by the client before initiating OAuth)
- `deviceId` — client device identifier

After a successful OAuth callback, the server redirects to `{state}?token={accessToken}` and sets the `refresh_token` cookie.
