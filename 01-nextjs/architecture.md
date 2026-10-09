# Next.js Dashboard Architecture

## Architecture Flow

```text
                 USER
                   |
                   v
           Next.js Dashboard
                   |
          +--------+--------+
          |                 |
          v                 v
    Server Components   Client Components
          |                 |
          v                 v
    Fetch Initial Data   User Interactions
          |                 |
          v                 v
    Render Dashboard     Search / Filters
          |                 |
          +--------+--------+
                   |
                   v
             Display Results
```

## Component Responsibilities

| Component | Type | Responsibility |
|---|---|---|
| Dashboard layout | Server | Provides the common page structure |
| Sidebar | Server | Displays navigation links |
| Initial statistics | Server | Fetches initial dashboard data |
| Search bar | Client | Handles interactive search |
| Filters | Client | Updates displayed results |
| Live status card | Client | Updates status dynamically |

## Design Decision

Server Components are preferred for non-interactive content and server-side data fetching. Client Components are used for state, event handlers, and browser-side interactions.

The client-server boundary should be kept as small as practical to avoid unnecessary client-side JavaScript.

## Official Documentation

https://nextjs.org/docs
