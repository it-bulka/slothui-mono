# Architecture Overview

SlothUI is a full-stack social networking application built as a Yarn Workspaces monorepo.

---

## Tech Stack

| Layer        | Technology |
|--------------|---|
| Frontend     | React 18 + TypeScript + Redux Toolkit + Vite |
| Backend      | NestJS + TypeScript + TypeORM |
| Database     | PostgreSQL 17 |
| Real-time    | Socket.io (WebSocket) |
| File storage | Cloudinary |
| Cache        | Redis |
| Email        | Nodemailer + Handlebars templates |
| Auth         | JWT (access + refresh) + 7 OAuth2 providers |

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  Redux Store → Services (HTTP) → REST API                   │
│  SocketBootstrap → Socket.io → WebSocket events             │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP + WebSocket
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                        Backend (NestJS)                      │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐    │
│  │ REST API │  │  WsGateway│  │   Event Emitter Layer  │    │
│  │(Controllers│ │(Socket.io)│  │(Internal pub/sub bridge│    │
│  └────┬─────┘  └────┬──────┘  └───────────┬───────────┘    │
│       │              │                     │                │
│  ┌────▼──────────────▼─────────────────────▼───────────┐   │
│  │                 Service Layer                        │   │
│  │  AuthService, PostsService, MessagesService, ...    │   │
│  └────────────────────────┬────────────────────────────┘   │
│                            │                               │
│  ┌─────────────────────────▼────────────────────────────┐  │
│  │           TypeORM + PostgreSQL                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

### JWT (local and OAuth)

1. Client sends credentials to `POST /api/auth/login`
2. Server validates, issues:
   - **Access token** (short-lived, ~15min) — returned in response body
   - **Refresh token** (long-lived) — stored as HTTP-only cookie `refresh_token`
3. Client includes `Authorization: Bearer {accessToken}` on protected requests
4. On expiry, client calls `GET /api/auth/refresh` to rotate both tokens

### OAuth2 Flow

1. Client redirects browser to `GET /api/auth/{provider}/login`
2. Provider authenticates and redirects to `GET /api/auth/{provider}/callback?state={redirectUrl}&deviceId={id}`
3. Server exchanges code for profile, creates/finds user, issues tokens
4. Server redirects to `{state}?token={accessToken}` and sets cookie

---

## WebSocket Room Model

```
user:{userId}    — Personal room. Each connected socket joins on auth.
                   Target for: notifications, follower events, friend events, unread batches

chat:{chatId}    — Chat-specific room. User joins all their chats on connect.
                   Target for: new messages, typing indicators, member changes
```

---

## Request Lifecycle

```
Client Request
     │
     ▼
NestJS Guards (JwtAuthGuard, RolesGuard)
     │
     ▼
Controller
     │
     ▼
Pipe / Interceptor (FileInterceptor, ParsePipe)
     │
     ▼
Service (business logic)
     │
     ├──► TypeORM Repository (PostgreSQL)
     │
     ├──► Cloudinary (file uploads)
     │
     └──► EventEmitter → WsGateway → Socket.io broadcast
```

---

## Cursor-Based Pagination

All list endpoints use cursor-based pagination (not offset/page-based):

```json
{
  "items": [...],
  "nextCursor": "eyJpZCI6IjEyMyJ9"
}
```

Pass `nextCursor` as `cursor` in the next request. When `nextCursor` is `null`, there are no more items.
