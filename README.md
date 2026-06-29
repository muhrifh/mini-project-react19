# NTT Submission - React 19 Mini Project

A modern React 19 application with authentication, product management CRUD, and responsive dashboard layout.

## Tech Stack

- **React 19** (Vite)
- **TypeScript**
- **Zustand** - State management
- **shadcn/ui** + **Tailwind CSS** - UI components
- **React Router v7** - Routing
- **DummyJSON API** - Backend API

## Features

- Login/Logout with JWT authentication
- Protected routes
- Dashboard with sidebar navigation
- Product list with search functionality
- Product detail view
- Add/Edit/Delete products
- Responsive design (mobile + desktop)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Demo Credentials

```
Username: emilys
Password: emilyspass
```

## Deployment

### Vercel
1. Push to GitHub public repo
2. Import project on vercel.com
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

### Netlify
1. Push to GitHub public repo
2. New site from Git on netlify.com
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

## Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Navbar, DashboardLayout
│   └── ui/              # shadcn/ui components
├── pages/
│   ├── Login.tsx
│   ├── Home.tsx
│   └── products/        # Product CRUD pages
├── stores/              # Zustand stores
├── services/            # API service layer
├── types/               # TypeScript types
└── lib/                 # Utilities
```

## API Reference

Base URL: `https://dummyjson.com`

- `POST /auth/login` - Login
- `GET /products` - List products
- `GET /products/search?q=` - Search products
- `GET /products/:id` - Get product
- `POST /products/add` - Add product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
