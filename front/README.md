# SlothUI — Frontend

React 18 single-page application for the SlothUI social network. Uses Feature-Sliced Design architecture with Redux Toolkit for state management and Socket.io for real-time features.

## Tech Stack

| Concern | Library |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5.8 |
| Build | Vite 7 |
| State | Redux Toolkit |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 + CSS Modules + Sass |
| Forms | React Hook Form + Zod |
| Real-time | Socket.io Client |
| UI Components | Lucide icons, Framer Motion, Swiper, React Select |
| Maps | Leaflet + React Leaflet |
| Testing | Vitest + Playwright |
| Component Dev | Storybook 10 |

## Getting Started

```bash
cd front
npm install
npm run dev
```

Runs at `http://localhost:5173`. Expects the backend at `http://localhost:3000` (configurable via `VITE_API_BASE`).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |
| `npm run madge` | Detect circular dependencies |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook |

## Architecture

The frontend follows [Feature-Sliced Design](https://feature-sliced.design/) principles with strict import direction rules.

```
src/
├── app/              # Redux store, router, layouts, socket bootstrap
├── pages/            # Route-level components
├── widgets/          # Composed UI blocks (Feed, PostCard, NavBar, etc.)
├── features/         # User interaction logic (LikePost, SendMessage, etc.)
├── entities/         # Redux slices for domain models
├── shared/           # Reusable UI, services, hooks, types, utils
├── api/              # API layer
├── types/            # Shared TypeScript types
├── stories/          # Storybook stories
└── mock/             # Mock data for development
```

**Import rule:** `pages` → `widgets` → `features` → `entities` → `shared`. Never import upward.

**Path alias:** `@/` maps to `src/`.

### Pages

AccountSettings, ActivityPage, Chats, EventDetails, ForgotPassword, Friends, Home, LikedPage, Login, Me, Messages, MyEvents, MyFriendsSuggestions, NotFound, NotificationsPage, OAuthError, PostPage, PrivacySettings, ProfileSettings, Register, ResetPassword, SavedPage, Settings, User, UserFriends, VerifyEmail.

### Entity Slices (Redux)

AuthUser, Chats, Comment, Contacts, CurrentChat, Event, Friends, FriendSuggestions, Map, Message, Notification, NotificationsCounters, Poll, Post, ProfileAnalytics, ReplyTarget, Story, StoryAvatar, Typing, UsersProfiles, UsersSuggestions.

### Service Layer

Services in `shared/libs/services/` wrap the HTTP client. They are created once and provided via React Context (`shared/libs/services/context/`). Thunks access services through the `extra` argument of `createAsyncThunk`.

### Real-time

Socket.io client lives in `shared/libs/services/socketService/`. Global listeners are initialized in `app/sockets/`. The `SocketBootstrap` component mounts listeners after authentication.

## Documentation

- [Architecture Details](./docs/architecture.md) — component patterns, state management, and data flow
- [Styling Guide](./docs/styling.md) — Tailwind CSS 4, CSS Modules, and naming conventions
