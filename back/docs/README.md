# SlothUI Project Documentation

SlothUI is a full-stack social networking monorepo with real-time messaging, posts, polls, stories, events, and friend features.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Redux Toolkit + Vite |
| Backend | NestJS + TypeScript + TypeORM + PostgreSQL |
| Real-time | Socket.io |
| Auth | JWT + 7 OAuth2 providers |

## Getting Started

→ [Setup Guide](./guides/setup.md)

## API Documentation

### Interactive (live server required)

| Interface | URL | Description |
|---|---|---|
| Swagger UI | `http://localhost:3000/docs/rest` | REST API — all endpoints, schemas, try-it-out |
| AsyncAPI UI | `http://localhost:3000/docs` | WebSocket events — full event catalogue |

### Markdown Reference

| Module | File |
|---|---|
| Authentication | [api/auth.md](./api/auth.md) |
| Users | [api/users.md](./api/users.md) |
| Posts | [api/posts.md](./api/posts.md) |
| Comments | [api/comments.md](./api/comments.md) |
| Messages | [api/messages.md](./api/messages.md) |
| Chats | [api/chats.md](./api/chats.md) |
| Stories | [api/stories.md](./api/stories.md) |
| Events | [api/events.md](./api/events.md) |
| Polls | [api/polls.md](./api/polls.md) |
| Friends (Followers) | [api/friends.md](./api/friends.md) |
| Sessions | [api/sessions.md](./api/sessions.md) |
| Notifications | [api/notifications.md](./api/notifications.md) |
| Stats | [api/stats.md](./api/stats.md) |
| WebSocket Events | [websocket/events.md](./websocket/events.md) |

## Architecture

- [Overview](./architecture/overview.md) — tech stack, auth flow, WebSocket rooms, request lifecycle
- [Modules](./architecture/modules.md) — all backend modules with responsibilities and dependencies

## Guides

- [Setup](./guides/setup.md) — local development setup
- [Deployment](./guides/deployment.md) — PM2, Docker, Nginx, production env

## Repository Structure

```
back/      — NestJS backend
front/     — React frontend
docs/
  api/            — REST API reference (1 file per module)
  websocket/      — WebSocket event reference
  architecture/   — System architecture docs
  guides/         — Setup and deployment guides
  backend/        — Backend feature analysis and decisions
  frontend/       — Frontend feature analysis and decisions
```
