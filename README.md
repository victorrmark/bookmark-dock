# Bookmark Dock — A Tag-Driven Bookmark Dashboard

A modern bookmark manager built with Next.js and Supabase that helps developers organise resources using controlled tags, smart filtering, pinning, archiving, and fast search. 

## Features
### Bookmark Management
- Add bookmarks with predefined tags
- Automatic website favicon retrieval
- Pin important bookmarks to top
- Archive bookmarks without deletion
- Secure per-user bookmark ownership

### Organisation
- Tag-based filtering
- Search by name
- Sort by:
  - Recently added
  - Last visited
  - Most visited

### Smart UI Behaviour
- Dynamic tag usage badges
- Optimised data fetching with React Query
- Fast client-side filtering and sorting
- Creation date: Enables Recently Added sorting
- Last Visited Date: Enables Recently Added sorting
- Visit Count

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack React Query
- Shadcn for UI

### Backend & Database
- Supabase Auth
- Supabase Postgres
- Row Level Security (RLS)

### State Management
- React Context

## Architecture Overview

The application separates responsibilities clearly:

**Server State**
Handled by React Query
- Fetch bookmarks
- Fetch archived bookmarks
- Mutations (archive, pin, update visits)

**UI View State**
Handled by React Context
- Search term
- Selected tags
- Sort order
- View preferences

**API Layer**
Next.js API routes:
- Secure Supabase access
- Update behavioural metrics (last_visited, visit_count)
- Enforce authentication

**Data Derivation Strategy**
- Tag badge counts are derived client-side
- Filtering and sorting occur locally after a single data fetch
- Minimises database queries
- Improves UI responsiveness

## Getting Started
**Prerequisites**
- Node.js
- Supabase account
- pnpm installed
- Environment variables configured

**Installation**
Clone the repository:

```bash
git clone <repo-url>
cd <project>
```
If pnpm is not installed
```bash
npm install -g pnpm
``` 

Install dependencies:
```bash
pnpm install
```

Create .env.local:
```js
NEXT_PUBLIC_SUPABASE_URL=(from supabse)
NEXT_PUBLIC_SUPABASE_ANON_KEY=(from supabse)
SUPABASE_SERVICE_ROLE_KEY=(from supabase)
NEXT_PUBLIC_URL=()
```

Run development Server
```bash
pnpm dev
```

## Future Improvements
- Drag-and-drop bookmark ordering
- Collections / folders
- Bookmark sharing
- Keyboard shortcuts
- Analytics dashboard
- Offline support


## Author

Built by Victor 
Full-stack developer focused on scalable frontend architecture and clean data-driven UI design.

- Twitter - [@victorrmark](https://www.twitter.com/victorrmark)
- Email - [innovimark@gmail.com](mailto:innovimark@gmail.com)
