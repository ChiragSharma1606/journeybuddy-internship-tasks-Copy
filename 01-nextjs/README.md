# Next.js Frontend Architecture

## Objective
Design a client-server boundary layout for a multi-page dashboard using Next.js.

## Dashboard Components

### Server Components
- **Dashboard Layout:** Provides the common page structure.
- **Sidebar:** Displays static navigation links.
- **Header:** Displays the application title and navigation.
- **Initial Statistics:** Fetches and displays dashboard data on the server.
- **Recent Activity:** Displays activity data retrieved from the backend.

### Client Components
- **Search Bar:** Handles user input and dynamic search.
- **Live Status Card:** Updates status interactively.
- **Filters:** Allows users to filter dashboard data.
- **Interactive Charts:** Supports user interaction with displayed data.

## Architecture

1. The user opens the dashboard.
2. Next.js renders the page and server components.
3. Server components retrieve the initial data.
4. Interactive client components handle user actions.
5. Client components request updated data when required.
6. The dashboard displays the updated results.

## Directory Structure

```text
01-nextjs/
├── README.md
└── architecture.md
```

## Rendering Strategy

Server Components are used for data fetching and non-interactive content. Client Components are used when browser-side interactivity, event handlers, or state management is required.

## Reference Documentation

https://nextjs.org/docs
