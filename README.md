# SlothUI

A full-stack social networking platform with real-time messaging, posts, polls, stories, events, and friend features. Built as an npm workspaces monorepo.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Redux Toolkit, Vite |
| Backend | NestJS, TypeScript, TypeORM |
| Database | PostgreSQL 17, Redis 7 |
| Real-time | Socket.io |
| Auth | JWT + OAuth2 (Google, Facebook, GitHub, Instagram, Twitter, LinkedIn, Telegram) |
| Infrastructure | Docker Compose, GitHub Actions CI/CD |
| Styling | Tailwind CSS 4, CSS Modules, Sass |

## Project Structure

```
slothui/
├── front/              # React SPA (Feature-Sliced Design)
├── back/               # NestJS API server
├── docker-compose.yml          # PostgreSQL + Redis (shared base)
├── docker-compose.dev.yml      # Development overrides (hot-reload backend)
├── docker-compose.prod.yml     # Production overrides
└── .github/workflows/          # CI/CD pipelines
```

## Quick Start

### Prerequisites

- Node.js 22+
- Docker & Docker Compose

### 1. Start infrastructure

```bash
npm run docker:dev
```

This starts PostgreSQL, Redis, and the backend with hot-reload.

### 2. Start frontend

```bash
cd front
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3000`.

### Environment Variables

- **Backend:** copy `back/.env.example` to `back/.env` — requires DB credentials, JWT secrets, OAuth keys, Cloudinary credentials, SMTP config
- **Frontend:** set `VITE_API_BASE` (defaults to `http://localhost:3000`)

## Available Scripts (root)

| Script | Description |
|---|---|
| `npm run docker:dev` | Start dev environment (DB + Redis + backend with hot-reload) |
| `npm run docker:dev:build` | Same as above, with forced image rebuild |
| `npm run docker:prod` | Start production environment |
| `npm run docker:up` | Start only PostgreSQL + Redis |
| `npm run lint:front` | Run ESLint on frontend |
| `npm run lint:back` | Run ESLint on backend |

## Documentation

- [Frontend README](./front/README.md) — frontend architecture, setup, and development guide
- [Backend README](./back/README.md) — backend architecture, API overview, and development guide
- [Nginx Infrastructure Migration](./docs/infrastructure/nginx-infra-migration.md) — how nginx was moved to a shared infrastructure layer

## Deployment

The project uses GitHub Actions for CI/CD:

- **Backend:** `.github/workflows/deploy-backend.yml` — builds Docker image and deploys to a Contabo VPS
- **Frontend:** `.github/workflows/deploy-frontend.yml` — builds and deploys the SPA

Production nginx is managed separately in `/home/deploy/infra/` on the server. See the [infrastructure migration doc](./docs/infrastructure/nginx-infra-migration.md) for details.
