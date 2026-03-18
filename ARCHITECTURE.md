# 🏗️ Nashik Express — Complete Project Architecture

> **Last Updated:** 2026-03-18  
> **Project Type:** Digital Marathi Newspaper Platform  
> **Status:** Production-Ready (Full-Stack with Lovable Cloud)

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Routing Map](#4-routing-map)
5. [Database Schema](#5-database-schema)
6. [Authentication & RBAC](#6-authentication--rbac)
7. [Admin Panel](#7-admin-panel)
8. [Frontend Components](#8-frontend-components)
9. [Data Flow](#9-data-flow)
10. [Storage & File Uploads](#10-storage--file-uploads)
11. [API & Data Fetching](#11-api--data-fetching)
12. [Design System](#12-design-system)
13. [Security (RLS Policies)](#13-security-rls-policies)
14. [Deployment](#14-deployment)
15. [Environment Variables](#15-environment-variables)
16. [Key Files Reference](#16-key-files-reference)
17. [For AI Tools — Quick Reference](#17-for-ai-tools--quick-reference)

---

## 1. Project Overview

**Nashik Express (नाशिक एक्सप्रेस)** is a full-stack Marathi-language digital newspaper platform designed for daily news publishing. Admins/editors can publish articles with images, manage users, track newsletter subscribers, and view analytics — all without touching code.

### Key Features
- 📰 Daily news publishing with category-based organization
- 🔍 Full-text search (PostgreSQL `tsvector`)
- 🔴 Breaking news ticker (animated)
- 📱 Responsive design (mobile-first)
- 🔐 Role-based access control (Admin / Editor / User)
- 📊 Analytics dashboard
- 📧 Newsletter subscriber management
- 🖼️ Image upload to cloud storage
- 📄 PDF archive page
- 🌙 Dark mode support

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18 + TypeScript | UI rendering |
| **Build Tool** | Vite 5 (`@vitejs/plugin-react`, Babel-based) | Dev server & bundling |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS |
| **UI Components** | shadcn/ui (Radix primitives) | Accessible component library |
| **Routing** | React Router v6 | Client-side routing |
| **State/Data Fetching** | @tanstack/react-query v5 | Server-state caching |
| **Backend/Database** | Lovable Cloud (Supabase PostgreSQL) | Data persistence |
| **Authentication** | Lovable Cloud Auth (email/password) | User login/signup |
| **File Storage** | Lovable Cloud Storage | Article image uploads |
| **Icons** | Lucide React | SVG icon library |
| **Charts** | Recharts | Analytics visualizations |
| **Fonts** | Tiro Devanagari Marathi, Playfair Display, Source Sans 3 | Typography |

> **Note:** Vite uses `@vitejs/plugin-react` (Babel) instead of SWC to avoid native binding errors in deployment environments.

---

## 3. Project Structure

```
nashik-express/
├── public/                          # Static assets served directly
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── assets/                      # Imported images (bundled by Vite)
│   │   ├── hero-nashik.jpg
│   │   ├── logo.jpg / logo.png
│   │   └── news-*.jpg               # Category placeholder images
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui base components (DO NOT EDIT)
│   │   │   ├── button.tsx, card.tsx, dialog.tsx, input.tsx
│   │   │   ├── select.tsx, tabs.tsx, toast.tsx, switch.tsx
│   │   │   └── ... (40+ components)
│   │   │
│   │   ├── admin/                   # Admin panel components
│   │   │   ├── ArticleManager.tsx   # CRUD for articles + image upload
│   │   │   ├── UserManager.tsx      # Role management (admin only)
│   │   │   ├── NewsletterManager.tsx # Subscriber list management
│   │   │   └── AnalyticsDashboard.tsx # Site stats & charts
│   │   │
│   │   ├── Navbar.tsx               # Top nav with search, auth buttons
│   │   ├── NavLink.tsx              # Navigation link component
│   │   ├── Footer.tsx               # Site footer
│   │   ├── BreakingNewsTicker.tsx   # Scrolling breaking news bar
│   │   ├── NewsCard.tsx             # Article card (3 variants)
│   │   ├── CategorySection.tsx      # Homepage category block
│   │   ├── PDFDownloadBanner.tsx    # PDF download CTA
│   │   └── ProtectedRoute.tsx       # Auth guard wrapper
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx          # Global auth state + role management
│   │
│   ├── hooks/
│   │   ├── useArticles.ts          # All article data-fetching hooks
│   │   ├── use-toast.ts            # Toast notification hook
│   │   └── use-mobile.tsx          # Mobile viewport detection
│   │
│   ├── integrations/supabase/      # ⚠️ AUTO-GENERATED — DO NOT EDIT
│   │   ├── client.ts               # Supabase client instance
│   │   └── types.ts                # Database TypeScript types
│   │
│   ├── data/
│   │   └── newsData.ts             # Legacy static data (fallback)
│   │
│   ├── pages/
│   │   ├── Index.tsx               # Homepage
│   │   ├── Category.tsx            # Category listing page
│   │   ├── Article.tsx             # Single article detail page
│   │   ├── PDFArchive.tsx          # PDF downloads page
│   │   ├── About.tsx               # About / Contact page
│   │   ├── Login.tsx               # Auth page (login + signup)
│   │   ├── NotFound.tsx            # 404 page
│   │   └── admin/
│   │       └── AdminDashboard.tsx  # Admin panel shell with tabs
│   │
│   ├── lib/utils.ts                # Tailwind merge utility (cn)
│   ├── App.tsx                     # Root component with routing
│   ├── App.css                     # Additional global styles
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Design tokens & Tailwind config
│
├── supabase/
│   ├── config.toml                 # ⚠️ AUTO-GENERATED
│   └── migrations/                 # ⚠️ READ-ONLY SQL migrations
│
├── ARCHITECTURE.md                 # ← THIS FILE
├── vite.config.ts                  # Vite configuration
├── tailwind.config.ts              # Tailwind theme extensions
└── package.json                    # Dependencies & scripts
```

---

## 4. Routing Map

| Route | Page Component | Access | Description |
|-------|---------------|--------|-------------|
| `/` | `Index.tsx` | Public | Homepage with featured articles, category sections, breaking ticker |
| `/category/:slug` | `Category.tsx` | Public | Filtered article list by category slug |
| `/article/:id` | `Article.tsx` | Public | Full article view with related articles |
| `/pdf-archive` | `PDFArchive.tsx` | Public | PDF newspaper downloads |
| `/about` | `About.tsx` | Public | About the publication |
| `/contact` | `About.tsx` | Public | Alias for About page |
| `/login` | `Login.tsx` | Public | Login & signup form |
| `/admin` | `AdminDashboard.tsx` | 🔒 Editor+ | Admin panel (protected by `ProtectedRoute`) |
| `/*` | `NotFound.tsx` | Public | 404 fallback |

### Route Protection
```
ProtectedRoute wraps /admin
  → Checks AuthContext for user session
  → Verifies role >= 'editor' (editors and admins)
  → Redirects to /login if unauthorized
```

---

## 5. Database Schema

### Tables Overview

```
┌──────────────────────┐     ┌──────────────────────┐
│      profiles        │     │     user_roles        │
├──────────────────────┤     ├──────────────────────┤
│ id (PK, uuid)        │     │ id (PK, uuid)         │
│ user_id (uuid)       │     │ user_id (uuid)        │
│ display_name (text)  │     │ role (app_role enum)   │
│ avatar_url (text?)   │     │ created_at            │
│ created_at           │     └──────────────────────┘
│ updated_at           │
└──────────────────────┘

┌──────────────────────────┐     ┌──────────────────────┐
│        articles          │     │     categories        │
├──────────────────────────┤     ├──────────────────────┤
│ id (PK, uuid)            │──→  │ id (PK, uuid)         │
│ title (text, required)   │     │ name (text)           │
│ excerpt (text)           │     │ name_marathi (text)   │
│ content (text)           │     │ slug (text, unique)   │
│ image_url (text?)        │     │ sort_order (int)      │
│ category_id (FK → cat)   │     │ created_at            │
│ author_id (uuid?)        │     └──────────────────────┘
│ author_name (text)       │
│ status (draft/published) │     ┌──────────────────────────┐
│ is_featured (bool)       │     │ newsletter_subscribers   │
│ is_breaking (bool)       │     ├──────────────────────────┤
│ read_time (text)         │     │ id (PK, uuid)            │
│ published_at (timestamptz)│    │ email (text, unique)     │
│ created_at               │     │ is_active (bool)         │
│ updated_at               │     │ subscribed_at            │
└──────────────────────────┘     │ unsubscribed_at (ts?)    │
                                 └──────────────────────────┘
```

### Enum Type
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');
```

### Database Functions

| Function | Purpose | Security |
|----------|---------|----------|
| `has_role(user_id, role)` | Check if user has a specific role | `SECURITY DEFINER` — bypasses RLS |
| `handle_new_user()` | Auto-creates profile + assigns 'user' role on signup | `SECURITY DEFINER` trigger on `auth.users` |
| `update_updated_at_column()` | Auto-updates `updated_at` timestamp | Trigger on articles |
| `search_articles(query)` | Full-text search across title, excerpt, content | `SECURITY DEFINER`, returns published only |

### Expected Category Slugs
| Slug | Marathi | English |
|------|---------|---------|
| `politics` | राजकारण | Politics |
| `sports` | क्रीडा | Sports |
| `business` | व्यापार | Business |
| `entertainment` | मनोरंजन | Entertainment |
| `local` | स्थानिक | Local News |

---

## 6. Authentication & RBAC

### Auth Flow
```
User visits /login
  → Enters email + password
  → signUp() or signIn() via Supabase Auth
  → On signup: handle_new_user() trigger fires
      → Creates row in profiles table
      → Creates row in user_roles (default: 'user')
  → AuthContext fetches role from user_roles
  → Navbar renders conditional buttons based on role
```

### Role Hierarchy

| Role | Permissions |
|------|------------|
| **admin** | Full CRUD on articles, manage user roles, view subscribers, view analytics, delete articles |
| **editor** | Create/edit/publish articles, view analytics |
| **user** | Read published articles only (default role) |

### AuthContext API (`src/contexts/AuthContext.tsx`)
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: 'admin' | 'editor' | 'user' | null;
  loading: boolean;
  signIn(email, password): Promise<{ error }>
  signUp(email, password, displayName): Promise<{ error }>
  signOut(): Promise<void>
  isAdmin: boolean;    // role === 'admin'
  isEditor: boolean;   // role === 'admin' || role === 'editor'
}
```

### Current Admin Account
- **Email:** nashikexpressmedia10@gmail.com
- **Role:** admin

---

## 7. Admin Panel

**Route:** `/admin` (protected — requires editor or admin role)

### Tabs

| Tab | Component | Role | Features |
|-----|-----------|------|----------|
| **लेख (Articles)** | `ArticleManager.tsx` | Editor+ | Create, edit, delete articles; image upload; featured/breaking toggle; publish/draft |
| **वापरकर्ते (Users)** | `UserManager.tsx` | Admin only | View all users; change roles via dropdown |
| **वृत्तपत्रिका (Newsletter)** | `NewsletterManager.tsx` | Admin | View subscriber list; active/inactive status |
| **विश्लेषण (Analytics)** | `AnalyticsDashboard.tsx` | Editor+ | Article count, subscriber stats, charts |

### Article Publishing Workflow
```
1. Click "नवीन लेख" (New Article)
2. Fill: title, excerpt, content, category, author name
3. Upload image → stored in 'article-images' bucket
4. Toggle: is_featured, is_breaking
5. Set status: draft or published
6. Save → INSERT/UPDATE to articles table
7. If published → immediately visible on public site
```

---

## 8. Frontend Components

### Layout Components
| Component | File | Description |
|-----------|------|-------------|
| `Navbar` | `Navbar.tsx` | Logo, search bar, category links, login/dashboard/logout buttons |
| `Footer` | `Footer.tsx` | Site footer with links and copyright |
| `BreakingNewsTicker` | `BreakingNewsTicker.tsx` | Animated scrolling bar for breaking headlines |

### Content Components
| Component | File | Description |
|-----------|------|-------------|
| `NewsCard` | `NewsCard.tsx` | Article card with image, title, excerpt, metadata. Variants: `featured`, `default`, `compact` |
| `CategorySection` | `CategorySection.tsx` | Homepage section showing articles for one category |
| `PDFDownloadBanner` | `PDFDownloadBanner.tsx` | CTA banner for PDF newspaper downloads |

### Utility Components
| Component | File | Description |
|-----------|------|-------------|
| `ProtectedRoute` | `ProtectedRoute.tsx` | HOC that checks auth + role before rendering |
| `NavLink` | `NavLink.tsx` | Active-state-aware navigation link |

---

## 9. Data Flow

### Public Article Loading
```
Homepage (Index.tsx)
  → useFeaturedArticles()
      → supabase.from('articles').select('*, category:categories(*)')
         .eq('status', 'published').eq('is_featured', true)
      → Cached via react-query
  → useCategorySectionArticles('politics') etc.
      → Fetches category ID by slug → articles in that category
  → mapArticle() normalizes DB row → UI object
```

### Search Flow
```
User types in Navbar search bar (min 2 chars)
  → useSearchArticles(query)
      → supabase.rpc('search_articles', { search_query })
      → PostgreSQL full-text search (tsvector/tsquery)
      → Fetches categories separately → merges
```

### Article Publishing
```
Admin creates article in ArticleManager
  → supabase.from('articles').insert({...})
  → RLS checks: has_role(uid, 'admin') OR has_role(uid, 'editor')
  → If published: immediately visible on public site
  → react-query cache invalidated → UI refreshes
```

---

## 10. Storage & File Uploads

### Bucket: `article-images`
- **Visibility:** Public
- **Upload from:** Admin panel → ArticleManager
- **File path:** `{timestamp}_{filename}`

```typescript
// Upload pattern
const { data } = await supabase.storage
  .from('article-images')
  .upload(filePath, file);
const { data: { publicUrl } } = supabase.storage
  .from('article-images')
  .getPublicUrl(filePath);
// publicUrl saved to articles.image_url
```

---

## 11. API & Data Fetching

All data fetching uses **@tanstack/react-query** for caching and loading states.

### Custom Hooks (`src/hooks/useArticles.ts`)

| Hook | Query Key | Purpose |
|------|-----------|---------|
| `useFeaturedArticles()` | `['articles', 'featured']` | Top 3 featured published articles |
| `useArticlesByCategory(slug)` | `['articles', 'category', slug]` | All published articles in a category |
| `useCategorySectionArticles(slug, limit)` | `['articles', 'section', slug, limit]` | Limited articles for homepage sections |
| `useArticle(id)` | `['article', id]` | Single article with full content |
| `useRelatedArticles(id, slug)` | `['articles', 'related', id, slug]` | 3 related articles from same category |
| `useSearchArticles(query)` | `['articles', 'search', query]` | Full-text search (min 2 chars) |
| `useBreakingNews()` | `['articles', 'breaking']` | Breaking news titles for ticker |

---

## 12. Design System

### Color Tokens (HSL in `index.css`)
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | 220 30% 97% | Page background |
| `--foreground` | 220 20% 10% | Primary text |
| `--primary` | 228 73% 62% | Royal blue (from logo) |
| `--secondary` | 228 60% 50% | Deeper blue accent |
| `--muted` | 220 20% 92% | Subtle backgrounds |
| `--destructive` | 0 84% 60% | Delete/error actions |
| `--accent` | 228 60% 50% | Interactive highlights |

### Typography
| CSS Class | Font | Usage |
|-----------|------|-------|
| `font-marathi` | Tiro Devanagari Marathi | Marathi text |
| `font-headline` | Playfair Display | English headlines |
| `font-sans` | Source Sans 3 | English body (default) |

### Responsive Breakpoints
| Breakpoint | Width |
|-----------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

---

## 13. Security (RLS Policies)

### `articles` table
| Policy | Command | Rule |
|--------|---------|------|
| Published articles viewable by everyone | SELECT | `status = 'published'` |
| Admins/editors can view all | SELECT | `has_role(uid, 'admin') OR has_role(uid, 'editor')` |
| Admins/editors can insert | INSERT | `has_role(uid, 'admin') OR has_role(uid, 'editor')` |
| Admins/editors can update | UPDATE | `has_role(uid, 'admin') OR has_role(uid, 'editor')` |
| Admins can delete | DELETE | `has_role(uid, 'admin')` |

### `categories` table
| Policy | Command | Rule |
|--------|---------|------|
| Viewable by everyone | SELECT | `true` |
| Admins/editors can manage | ALL | `has_role(uid, 'admin') OR has_role(uid, 'editor')` |

### `profiles` table
| Policy | Command | Rule |
|--------|---------|------|
| Viewable by everyone | SELECT | `true` |
| Users can insert own | INSERT | `auth.uid() = user_id` |
| Users can update own | UPDATE | `auth.uid() = user_id` |

### `user_roles` table
| Policy | Command | Rule |
|--------|---------|------|
| Users can view own role | SELECT | `auth.uid() = user_id` |
| Admins can view all | SELECT | `has_role(uid, 'admin')` |
| Admins can manage | ALL | `has_role(uid, 'admin')` |

### `newsletter_subscribers` table
| Policy | Command | Rule |
|--------|---------|------|
| Anyone can subscribe | INSERT | `true` |
| Admins can view | SELECT | `has_role(uid, 'admin')` |
| Admins can manage | UPDATE | `has_role(uid, 'admin')` |

### Security Notes
- Roles in separate `user_roles` table (not profiles) to prevent privilege escalation
- `has_role()` uses `SECURITY DEFINER` to bypass RLS recursion
- No anonymous signups — email + password required
- Auth state via `onAuthStateChange` listener (not localStorage)

---

## 14. Deployment

### Frontend
- **Platform:** Lovable (click "Publish" → "Update")
- **Build:** `vite build` → `dist/`
- **Preview URL:** `https://<project-id>.lovable.app`
- **Custom domain:** Settings → Domains

### Backend
- **Platform:** Lovable Cloud (deploys automatically)
- **Database:** PostgreSQL (auto-provisioned)
- **Auth:** Built-in email/password
- **Storage:** Built-in file storage

### Checklist
- [x] Database schema with RLS policies
- [x] Auth with role-based access
- [x] Admin panel for content management
- [x] Image upload to cloud storage
- [x] Full-text search
- [x] Breaking news ticker
- [x] Responsive design
- [x] Dark mode
- [ ] Custom domain
- [ ] SEO meta tags / Open Graph
- [ ] Privacy policy / Terms pages

---

## 15. Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Backend API URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public anon key |
| `VITE_SUPABASE_PROJECT_ID` | Project identifier |

> ⚠️ **NEVER edit `.env` manually** — auto-generated by Lovable Cloud.

---

## 16. Key Files Reference

### Files You CAN Edit
| File | Purpose |
|------|---------|
| `src/pages/*.tsx` | Page content and layout |
| `src/components/*.tsx` | Reusable UI components |
| `src/components/admin/*.tsx` | Admin panel modules |
| `src/hooks/useArticles.ts` | Data fetching logic |
| `src/contexts/AuthContext.tsx` | Auth state management |
| `src/index.css` | Design tokens and global styles |
| `tailwind.config.ts` | Theme extensions |

### Files You MUST NOT Edit
| File | Reason |
|------|--------|
| `src/integrations/supabase/client.ts` | Auto-generated client |
| `src/integrations/supabase/types.ts` | Auto-generated from DB |
| `supabase/config.toml` | Auto-managed config |
| `.env` | Auto-managed variables |
| `supabase/migrations/` | Read-only history |

---

## 17. For AI Tools — Quick Reference

### Adding a New Feature
1. Create component in `src/components/` or page in `src/pages/`
2. Add route in `src/App.tsx` if it's a page
3. If needs DB data: add hook in `src/hooks/useArticles.ts`
4. If needs new table: use migration tool
5. Style with Tailwind semantic tokens from `index.css`

### Common Patterns
```typescript
// Protected page (in App.tsx)
<ProtectedRoute requireRole="editor"><Component /></ProtectedRoute>

// DB query
import { supabase } from "@/integrations/supabase/client";

// Toast
const { toast } = useToast();

// Auth
const { user, role, isAdmin, isEditor } = useAuth();

// Data fetching
useQuery({ queryKey: [...], queryFn: async () => { ... } });
```

### Language Convention
- **UI text:** Marathi (Devanagari script)
- **Code/comments:** English
- **Categories:** Both `name` (English) and `name_marathi` (Marathi)

### File Dependency Graph
```
main.tsx → App.tsx
  ├── AuthProvider (wraps all)
  ├── Index.tsx → Navbar, BreakingNewsTicker, NewsCard, CategorySection, PDFDownloadBanner, Footer
  ├── Category.tsx → Navbar, Footer, NewsCard
  ├── Article.tsx → Navbar, Footer, NewsCard
  ├── Login.tsx → AuthContext (signIn/signUp)
  ├── AdminDashboard.tsx → ArticleManager, UserManager, NewsletterManager, AnalyticsDashboard
  └── All hooks → supabase/client.ts → Lovable Cloud backend
```
