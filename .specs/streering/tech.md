# Tech Spec - NTT Submission

## Tech Stack

| Layer           | Technology                          |
|-----------------|-------------------------------------|
| Framework       | React 19 + TypeScript               |
| Build Tool      | Vite 8                              |
| State Mgmt      | Zustand (with persist middleware)    |
| UI Components   | shadcn/ui (base-nova) + Tailwind CSS 4 |
| Routing         | React Router v7 (BrowserRouter)     |
| HTTP Client     | Fetch API (native)                  |
| Icons           | lucide-react                        |
| Notifications   | sonner (toast)                      |
| Font            | Geist Variable                      |
| Linting         | oxlint                              |
| Deployment      | Vercel / Netlify                    |

## API

Base URL: `https://dummyjson.com`

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | `/auth/login`         | Login user          |
| GET    | `/auth/me`            | Get current user    |
| GET    | `/products`           | List all products   |
| GET    | `/products/search?q=` | Search products     |
| GET    | `/products/:id`       | Get product detail  |
| POST   | `/products/add`       | Add new product     |
| PUT    | `/products/:id`       | Update product      |
| DELETE | `/products/:id`       | Delete product      |

Demo credentials: `emilys` / `emilyspass`

## Folder Structure

```
src/
├── assets/
├── components/
│   ├── ui/                        # shadcn/ui components (base-nova style)
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── table.tsx
│   │   └── textarea.tsx
│   ├── layout/
│   │   ├── dashboard-layout.tsx   # Sidebar + Navbar + Outlet
│   │   ├── navbar.tsx             # Top bar with user avatar/info
│   │   └── sidebar.tsx            # Navigation sidebar (responsive)
│   └── protected-route.tsx        # Auth guard wrapper
├── pages/
│   ├── home.tsx                   # Dashboard with stats cards
│   ├── login.tsx                  # Login form
│   └── products/
│       ├── product-list.tsx       # Grid view with search
│       ├── product-detail.tsx     # Full product info + image gallery
│       └── product-form.tsx       # Add & Edit (reusable)
├── stores/
│   ├── auth-store.ts              # Zustand auth state (persist to localStorage)
│   └── product-store.ts           # Zustand product state
├── services/
│   └── api.ts                     # ApiService class wrapping fetch
├── hooks/
├── lib/
│   └── utils.ts                   # cn() utility (clsx + tailwind-merge)
├── types/
│   └── index.ts                   # User, Product, AuthResponse, etc.
├── App.tsx                        # Router setup
├── main.tsx                       # Entry point
└── index.css                      # Tailwind + shadcn theme variables
```

## Routes

| Path                 | Component      | Auth Required |
|----------------------|----------------|---------------|
| `/login`             | Login          | No            |
| `/`                  | Home           | Yes           |
| `/products`          | ProductList    | Yes           |
| `/products/add`      | ProductForm    | Yes           |
| `/products/:id`      | ProductDetail  | Yes           |
| `/products/:id/edit` | ProductForm    | Yes           |
| `*`                  | Redirect to `/`| -             |

## Key Implementation Details

- **Auth**: Zustand `persist` middleware stores `user`, `token`, `isAuthenticated` to localStorage under `auth-storage` key. `protected-route` checks `isAuthenticated` and redirects to `/login` if false.
- **Product Store**: Centralized in Zustand with `fetchProducts`, `searchProducts`, `deleteProduct` actions. Products fetched from dummyjson API.
- **Product Form**: Single `product-form` component handles both add and edit modes based on URL param `:id`.
- **Responsive**: Sidebar collapses on mobile with hamburger menu toggle. Uses Tailwind `md:` breakpoints.
- **Notifications**: sonner toast for success/error on CRUD operations and login errors.

## Build & Run

```bash
pnpm install
pnpm dev       # Development server
pnpm build     # Production build (tsc + vite build)
pnpm lint      # oxlint
```
uild)
pnpm lint      # oxlint
```
