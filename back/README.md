# SlothUI — Backend

NestJS API server for the SlothUI social network. Provides REST endpoints, WebSocket gateway, JWT + OAuth2 authentication, and integrates with PostgreSQL, Redis, and Cloudinary.

## Tech Stack

| Concern | Library |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript |
| ORM | TypeORM |
| Database | PostgreSQL 17 |
| Cache | Redis 7 |
| Real-time | Socket.io (WebSocket gateway) |
| Auth | JWT (access + refresh tokens), Passport.js with 7 OAuth2 strategies |
| Validation | class-validator + class-transformer |
| File Storage | Cloudinary |
| Email | Nodemailer (@nestjs-modules/mailer) |
| API Docs | Swagger (REST) + AsyncAPI (WebSocket) |
| Testing | Jest |

## Getting Started

### With Docker (recommended)

From the monorepo root:

```bash
npm run docker:dev
```

This starts PostgreSQL, Redis, and the backend with hot-reload on `http://localhost:3000`.

### Without Docker

```bash
cd back
cp .env.example .env   # configure DB, JWT, OAuth, Cloudinary, SMTP
npm install
npm run start:dev
```

Requires PostgreSQL and Redis running locally.

## Scripts

| Script | Description |
|---|---|
| `npm run start:dev` | Start with watch mode (hot-reload) |
| `npm run build` | Compile with `nest build` |
| `npm run start:prod` | Run compiled output (`node dist/main`) |
| `npm run lint` | ESLint with auto-fix |
| `npm run test` | Run Jest tests |
| `npm run test:watch` | Jest in watch mode |
| `npm run test:cov` | Jest with coverage report |
| `npm run test:e2e` | End-to-end tests |

## Architecture

Standard NestJS modular layout. Each feature is a self-contained module with its own controller, service, entities, and DTOs.

```
src/
├── auth/                # JWT + 7 OAuth strategies (Google, Facebook, GitHub, Instagram, Twitter, LinkedIn, Telegram)
├── user/                # User CRUD, profile management
├── posts/               # Posts CRUD + feed algorithm
├── comments/            # Threaded comments
├── messages/            # Direct messages + unread buffering
├── chats/               # Chat rooms / groups
├── stories/             # Ephemeral stories
├── events/              # Calendar events
├── polls/               # Polls + voting
├── follower/            # Follow/friend relationships
├── followers-snapshot/  # Follower count snapshots
├── contacts/            # Contact management
├── notifications/       # Notification system
├── stats/               # Analytics and statistics
├── share/               # Content sharing
├── ws/                  # Socket.io gateway
├── event-emitter/       # Internal event bus for decoupled WS events
├── attachments/         # File handling
├── cloudinary/          # Media upload service
├── mailer/              # Email service (Nodemailer)
├── email-verification/  # Email verification flow
├── password-reset/      # Password reset flow
├── session/             # Session management
├── redis/               # Redis module
├── health/              # Health check endpoint
├── admin/               # Admin panel
├── geo-message/         # Geo-located messages
├── common/              # Guards, filters, decorators, validators
├── docs/                # AsyncAPI YAML specs
├── templates/           # Email templates
└── types/               # Shared TypeScript types
```

### Authentication

JWT access + refresh token strategy. OAuth flows redirect back to the frontend with tokens. Guards in `auth/guards/` and `common/guards/`. Protected routes use `JwtAuthGuard`.

### WebSocket Gateway

Single `WsGateway` in `ws/ws.gateway.ts` handles all Socket.io events. Decoupled from business logic via `event-emitter/` services. Typed events in `ws/types/`.

### Entity Mappers

Backend entity-to-response mappers are `*-mapper.ts` files co-located with their service. They transform TypeORM entities into API response DTOs.

## API Documentation

### Interactive (requires running server)

| Interface | URL | Description |
|---|---|---|
| Swagger UI | `http://localhost:3000/docs/rest` | REST API — endpoints, schemas, try-it-out |
| AsyncAPI UI | `http://localhost:3000/docs` | WebSocket events catalogue |

### Detailed Reference

See the [docs/](./docs/README.md) directory for per-module API documentation, architecture overviews, and guides.

## Environment Variables

The `.env` file requires:

- **Database:** `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- **JWT:** `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
- **OAuth:** keys for Google, Facebook, GitHub, Instagram, Twitter, LinkedIn, Telegram
- **Cloudinary:** `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- **SMTP:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- **Redis:** `REDIS_HOST`, `REDIS_PORT`
- **CORS:** defaults to `http://localhost:5173`
