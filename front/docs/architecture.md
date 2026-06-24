# Frontend Architecture

## Feature-Sliced Design

The codebase is organized into layers with strict dependency direction:

```
pages → widgets → features → entities → shared
```

Each layer can only import from layers below it.

### Layer Responsibilities

| Layer | Role | Example |
|---|---|---|
| `pages/` | Route-level containers, compose widgets | `Home`, `Messages`, `Login` |
| `widgets/` | Composite UI blocks, combine features and entities | `Feed`, `PostCard`, `NavBar` |
| `features/` | Single user interaction or use case | `LikePost`, `SendMessage`, `CreatePoll` |
| `entities/` | Domain model slices, selectors, basic UI | `Post`, `Message`, `AuthUser` |
| `shared/` | Framework-agnostic utilities, base UI, services | `Button`, `Modal`, `httpClient` |

## State Management

### Redux Store

Configured in `app/config/store/`. Uses `@reduxjs/toolkit` with `createAsyncThunk` for async operations.

Services (HTTP clients) are injected as `extra` into all thunks, avoiding direct imports and enabling testability.

Each entity has its own slice at `entities/<Name>/model/slice.ts`.

### Slice List

`authUser`, `chats`, `currentChat`, `comments`, `contacts`, `event`, `friends`, `friendSuggestions`, `map`, `messages`, `notification`, `notificationsCounters`, `poll`, `post`, `profileAnalytics`, `replyTarget`, `story`, `storyAvatar`, `typing`, `usersProfiles`, `usersSuggestions`.

## Service Layer

Services live in `shared/libs/services/` and wrap the HTTP client. Each service handles one domain (e.g., `PostsService`, `MessagesService`).

Services are instantiated once and provided via React Context (`shared/libs/services/context/`). Thunks receive them through the `extra` argument:

```ts
export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (_, { extra }) => {
    const { postsService } = extra;
    return postsService.getAll();
  }
);
```

## Real-time Communication

### Socket.io Client

- Client setup: `shared/libs/services/socketService/`
- Global listeners: `app/sockets/`
- Bootstrap: `SocketBootstrap` component mounts listeners after authentication

Events are typed and handled through the event-emitter pattern. The socket connects after JWT authentication and automatically reconnects on disconnect.

## Routing

React Router 7 with route-based code splitting. Route definitions live in `app/` alongside layout components.

Protected routes use auth guards that redirect unauthenticated users to the login page.

## Form Handling

- React Hook Form for form state
- Zod schemas in `shared/schemas/` for validation
- `@hookform/resolvers` bridges Zod with React Hook Form
