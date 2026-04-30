# Backend Modules

All modules live in `back/src/`. Each is a self-contained NestJS module.

---

## Module Map

| Module            | Path             | Description                                            | Key Dependencies                                    |
|-------------------|------------------|--------------------------------------------------------|-----------------------------------------------------|
| **Auth**          | `auth/`          | JWT + 7 OAuth2 strategies, password reset              | User, Session, Mailer                               |
| **User**          | `user/`          | User CRUD, profile, search, password change            | Stats, Cloudinary                                   |
| **Posts**         | `posts/`         | Posts CRUD, likes, saves, feed                         | Attachments, Polls, Cloudinary                      |
| **Comments**      | `comments/`      | Threaded comments on posts                             | User                                                |
| **Messages**      | `messages/`      | Direct and group messages, story reactions             | Chats, Attachments, Polls, GeoMessage, EventEmitter |
| **Chats**         | `chats/`         | Chat management, members, read state                   | User, EventEmitter                                  |
| **Stories**       | `stories/`       | Ephemeral media stories (24h TTL)                      | Cloudinary                                          |
| **Events**        | `events/`        | Calendar events with subscription                      | User, Cloudinary                                    |
| **Polls**         | `polls/`         | Polls and voting, embedded in posts/messages           | User                                                |
| **Follower**      | `follower/`      | Follow/unfollow, suggestions, confirmation             | User, Stats, EventEmitter                           |
| **Notifications** | `notifications/` | In-app notifications (like, follow, comment, system)   | User, EventEmitter                                  |
| **Sessions**      | `session/`       | Device session management                              | Auth, Redis                                         |
| **WsGateway**     | `ws/`            | Single Socket.io gateway for all real-time events      | EventEmitter, Messages, Chats                       |
| **EventEmitter**  | `event-emitter/` | Internal pub/sub bridge between services and WsGateway | WsGateway                                           |
| **Attachments**   | `attachments/`   | File metadata management                               | Cloudinary                                          |
| **Cloudinary**    | `cloudinary/`    | File upload/delete adapter                             | —                                                   |
| **GeoMessage**    | `geo-message/`   | Geographic location message type                       | —                                                   |
| **Mailer**        | `mailer/`        | Email sending via Nodemailer + Handlebars              | —                                                   |
| **Stats**         | `stats/`         | Counters and analytics (followers, messages)           | Follower                                            |
| **Share**         | `share/`         | Public post share page (server-rendered HTML)          | Posts                                               |
| **Admin**         | `admin/`         | Role-protected admin endpoint                          | Auth                                                |

---

## Module Interaction Diagram

```
                    ┌──────────┐
                    │   Auth   │◄───────── Session
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │   User   │◄──────── Stats ◄── Follower
                    └────┬─────┘
                         │
           ┌─────────────┼─────────────┐
           │             │             │
      ┌────▼───┐   ┌─────▼────┐  ┌────▼─────┐
      │  Posts │   │ Messages │  │  Stories │
      └────┬───┘   └─────┬────┘  └──────────┘
           │             │
      ┌────▼──┐    ┌─────▼─────┐
      │ Polls │    │   Chats   │
      └───────┘    └─────┬─────┘
                         │
                  ┌──────▼──────┐
                  │ EventEmitter│
                  └──────┬──────┘
                         │
                  ┌──────▼──────┐
                  │  WsGateway  │ ──► Socket.io clients
                  └─────────────┘
```

---

## EventEmitter Pattern

The `EventEmitter` module decouples business logic from WebSocket broadcasting. Services emit internal events; the WsGateway subscribes and broadcasts to clients.

```typescript
// In MessagesService:
eventEmitterMessageService.onNewMessage(msg);

// In WsGateway (onModuleInit):
this.msgSubject$.subscribe(({ msg }) => {
  this.server.to(msg.chatId).emit(MessageServerEvents.NEW, msg);
});
```

This prevents circular dependencies between services and the gateway.

---

## Global Configuration

| Aspect               | Value                                                           |
|----------------------|-----------------------------------------------------------------|
| Global API prefix    | `/api`                                                          |
| Excluded from prefix | `/docs`, `/docs/rest`, `/static`                                |
| Global pipes         | `ValidationPipe` (`whitelist: true`, `transform: true`)         |
| CORS                 | Configurable via `FRONT_ORIGIN` env var                         |
| Static files         | Served from `/public/social/*` (behind `StaticGuardMiddleware`) |
