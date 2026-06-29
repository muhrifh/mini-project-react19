# Submission - React 19 Mini Project

---

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

---

## Folder Structure

```
src/
├── assets/
├── components/
│   ├── ui/                        # shadcn/ui components
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
│   │   ├── dashboard-layout.tsx     # Sidebar + Navbar + Outlet
│   │   ├── navbar.tsx               # Top bar with user avatar/info
│   │   └── sidebar.tsx              # Navigation sidebar (responsive)
│   └── protected-route.tsx          # Auth guard wrapper
├── pages/
│   ├── home.tsx                     # Dashboard with stats cards
│   ├── login.tsx                    # Login form
│   └── products/
│       ├── product-list.tsx         # Grid view with search
│       ├── product-detail.tsx       # Full product info + image gallery
│       └── product-form.tsx         # Add & Edit (reusable)
├── stores/
│   ├── auth-store.ts                # Zustand auth state (persist to localStorage)
│   └── product-store.ts             # Zustand product state
├── services/
│   └── api.ts                       # ApiService class wrapping fetch
├── lib/
│   └── utils.ts                     # cn() utility (clsx + tailwind-merge)
├── types/
│   └── index.ts                     # User, Product, AuthResponse, etc.
├── App.tsx                          # Router setup
├── main.tsx                         # Entry point
└── index.css                        # Tailwind + shadcn theme variables
```

---

## Routes

| Path                 | Component          | Auth Required |
|----------------------|--------------------|---------------|
| `/login`             | login              | No            |
| `/`                  | home               | Yes           |
| `/products`          | product-list       | Yes           |
| `/products/add`      | product-form       | Yes           |
| `/products/:id`      | product-detail     | Yes           |
| `/products/:id/edit` | product-form       | Yes           |
| `*`                  | Redirect to `/`    | -             |

---

## Development Planning

### Phase 1: Project Setup & Configuration
**Target: Base project siap dikembangkan**

- [x] Init Vite + React 19 + TypeScript
- [x] Install dependencies: tailwindcss, shadcn/ui, zustand, react-router-dom
- [x] Setup Tailwind CSS configuration
- [x] Setup shadcn/ui (init + add components)
- [x] Setup folder structure
- [x] Setup TypeScript types (User, Product, AuthResponse, etc)
- [x] Setup API service layer dengan base URL dummyjson.com
- [x] Cleanup boilerplate Vite

### Phase 2: Authentication
**Target: User bisa login dan protected routes**

- [x] Buat Zustand auth store (login, logout, token, user data)
- [x] Buat login page dengan form (username + password)
- [x] Integrasi login API `POST /auth/login`
- [x] Simpan token ke localStorage + zustand persist
- [x] Buat protected-route component (redirect ke /login jika belum auth)
- [x] Buat logout functionality (clear token + redirect)
- [x] Handle loading state dan error messages

### Phase 3: Layout (sidebar, navbar, content)
**Target: Dashboard layout dengan navigasi**

- [x] Buat dashboard-layout component (sidebar + navbar + outlet)
- [x] Buat sidebar component dengan menu:
  - Home
  - Products
  - Add Product
  - Logout button
- [x] Buat navbar component:
  - Hamburger menu (mobile)
  - User greeting / avatar
- [x] Buat responsive sidebar (collapse di mobile)
- [x] Setup React Router:
  - `/login` → login page
  - `/` → home (protected)
  - `/products` → product-list (protected)
  - `/products/:id` → product-detail (protected)
  - `/products/add` → product-form (protected)
  - `/products/:id/edit` → product-form (protected)

### Phase 4: Product Features - List & Search
**Target: Menampilkan produk dengan fitur search**

- [x] Buat Zustand product store (products, loading, error, search)
- [x] Buat product-list page:
  - Fetch products `GET /products`
  - Search products `GET /products/search?q=keyword`
  - Display dalam Card grid layout
  - Loading skeleton
  - Empty state handling
- [x] Buat reusable Card component untuk product item
- [x] Delete confirmation dialog per product

### Phase 5: Product Features - Detail, Add, Edit, Delete
**Target: Full CRUD produk**

- [x] Buat product-detail page:
  - Fetch product `GET /products/:id`
  - Tampilkan semua info produk + image gallery
  - Tombol Edit dan Delete
- [x] Buat product-form (reusable untuk Add & Edit):
  - Form fields: title, description, price, category, stock, brand, thumbnail
  - Validasi form
- [x] Implementasi Add Product `POST /products/add`
- [x] Implementasi Edit Product `PUT /products/:id`
- [x] Implementasi Delete Product `DELETE /products/:id`
- [x] Delete confirmation dialog
- [x] Toast notification untuk success/error actions

### Phase 6: Home Page & Polish
**Target: Finalisasi dan polish**

- [x] Buat home page dengan welcome message (FirstName + LastName)
- [x] Dashboard stats cards (Total Products, Categories, Avg Rating, Active Users)
- [x] Loading states (skeleton screens)
- [x] Semua routes ter-protect

### Phase 7: Testing & Deployment
**Target: App live dan bisa diakses**

- [ ] Manual testing semua fitur:
  - Login / Logout flow
  - Product CRUD
  - Responsive design
  - Error handling
- [ ] Build production `pnpm build`
- [ ] Setup GitHub public repo
- [ ] Deploy ke Vercel / Netlify
- [ ] Test deployed app
- [ ] Submit: repo link + hosting link

---

## Deployment Plan

### Netlify
```
1. Push code ke GitHub public repo
2. Login ke netlify.com
3. New site from Git
4. Build command: pnpm build
5. Publish directory: dist
6. Deploy
```

---

## API Endpoints Reference

### Auth
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | `/auth/login`         | Login user          |
| GET    | `/auth/me`            | Get current user    |

### Products
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | `/products`           | List all products   |
| GET    | `/products/search?q=` | Search products     |
| GET    | `/products/:id`       | Get product detail  |
| POST   | `/products/add`       | Add new product     |
| PUT    | `/products/:id`       | Update product      |
| DELETE | `/products/:id`       | Delete product      |

Base URL: `https://dummyjson.com`

---

## Reusable Components List

| Component        | Location              | Description                          |
|------------------|-----------------------|--------------------------------------|
| Button           | `components/ui/`      | shadcn Button (variants)             |
| Input            | `components/ui/`      | shadcn Input                         |
| Textarea         | `components/ui/`      | shadcn Textarea                      |
| Label            | `components/ui/`      | shadcn Label                         |
| Card             | `components/ui/`      | shadcn Card (with sub-components)    |
| Table            | `components/ui/`      | shadcn Table                         |
| Dialog           | `components/ui/`      | shadcn Dialog (delete confirmation)  |
| Badge            | `components/ui/`      | shadcn Badge (category, stock)       |
| Skeleton         | `components/ui/`      | shadcn Skeleton (loading)            |
| Sonner           | `components/ui/`      | Toast notifications                  |
| Avatar           | `components/ui/`      | User avatar with fallback            |
| Sheet            | `components/ui/`      | Side panel component                 |
| Separator        | `components/ui/`      | Visual divider                       |
| Dropdown Menu    | `components/ui/`      | Dropdown menu                        |
| product-form     | `pages/products/`     | Reusable for Add & Edit              |
| dashboard-layout | `components/layout/`  | Sidebar + Navbar + Outlet            |
| protected-route  | `components/`         | Auth guard wrapper                   |

---

## Login Credentials (dummyjson)

```
Username: emilys
Password: emilyspass
```

Atau cek: https://dummyjson.com/users untuk list users lainnya.
