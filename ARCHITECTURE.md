# नाशिक एक्सप्रेस — Architecture & Flow Document

## 1. Overview

**नाशिक एक्सप्रेस** is a Marathi-language digital news platform for Nashik, India. It is a frontend-only Single Page Application (SPA) with static mock data. No backend or database is currently connected.

---

## 2. Tech Stack

| Layer        | Technology                          |
|-------------|--------------------------------------|
| Framework   | React 18 (TypeScript)                |
| Bundler     | Vite                                 |
| Styling     | Tailwind CSS + shadcn/ui components  |
| Routing     | React Router v6                      |
| State       | React Query (not yet used for API)   |
| Fonts       | Tiro Devanagari Marathi, Playfair Display, Source Sans 3 |

---

## 3. Project Structure

```
src/
├── assets/              # Static images (logo, hero, category images)
│   ├── logo.png
│   ├── hero-nashik.jpg
│   ├── news-*.jpg       # Category placeholder images
│
├── components/
│   ├── Navbar.tsx            # Sticky header with navigation, search, dark mode toggle
│   ├── BreakingNewsTicker.tsx # Horizontal scrolling breaking news bar
│   ├── NewsCard.tsx          # Reusable article card (3 variants: featured, default, compact)
│   ├── CategorySection.tsx   # Section wrapper for grouped articles (grid or list layout)
│   ├── PDFDownloadBanner.tsx  # Call-to-action banner for PDF newspaper download
│   ├── Footer.tsx            # Site footer with links, social, newsletter form
│   ├── NavLink.tsx           # Navigation link helper
│   └── ui/                   # shadcn/ui primitives (button, card, badge, etc.)
│
├── data/
│   └── newsData.ts           # All static article data + PDF archive data
│
├── pages/
│   ├── Index.tsx             # Homepage — hero + all category sections
│   ├── Category.tsx          # Filtered articles by category slug
│   ├── Article.tsx           # Single article detail page
│   ├── PDFArchive.tsx        # List of downloadable PDF editions
│   ├── About.tsx             # About us + contact form
│   └── NotFound.tsx          # 404 page
│
├── hooks/                    # Custom React hooks (use-mobile, use-toast)
├── lib/                      # Utility functions (cn helper)
├── index.css                 # Global styles, CSS variables, theme tokens
├── App.tsx                   # Root component with routing
└── main.tsx                  # Entry point
```

---

## 4. Routing Map

| Path                  | Page Component | Description                     |
|-----------------------|----------------|---------------------------------|
| `/`                   | `Index`        | Homepage with all sections      |
| `/category/:slug`     | `Category`     | Articles filtered by category   |
| `/article/:id`        | `Article`      | Single article detail view      |
| `/pdf-archive`        | `PDFArchive`   | Newspaper PDF download archive  |
| `/about`              | `About`        | About us & contact              |
| `/contact`            | `About`        | Same as About (alias)           |
| `*`                   | `NotFound`     | 404 catch-all                   |

**Valid category slugs:** `breaking`, `politics`, `business`, `sports`, `entertainment`, `local`

---

## 5. Data Model

### Article Interface
```typescript
interface Article {
  id: string;           // Unique identifier (e.g., "1", "2")
  title: string;        // Marathi headline
  excerpt: string;      // Short summary in Marathi
  image: string;        // Image path (from src/assets/)
  category: string;     // Display name in Marathi (e.g., "राजकारण")
  categorySlug: string; // URL slug (e.g., "politics")
  author: string;       // Author name in Marathi
  date: string;         // Date string in Marathi
  readTime: string;     // e.g., "५ मिनिटे"
  isBreaking?: boolean; // Shows "ताज्या" badge if true
}
```

### Data Arrays (all in `src/data/newsData.ts`)
- `featuredArticles` — Top hero section articles
- `politicsArticles` — राजकारण
- `sportsArticles` — क्रीडा
- `businessArticles` — व्यापार
- `entertainmentArticles` — मनोरंजन
- `localArticles` — नाशिक बातम्या
- `allArticles` — Combined array of all above
- `pdfArchive` — Array of `{ date, dateEn, size }` for PDF editions

---

## 6. Component Flow

### Homepage (`Index.tsx`)
```
Navbar
  └── Logo + Desktop Nav Links + Search + Dark Mode Toggle + Mobile Menu
BreakingNewsTicker
  └── Horizontal scrolling headlines
Hero Section
  └── 1 Featured NewsCard (large) + 2 Default NewsCards (sidebar)
PDFDownloadBanner
  └── CTA to download today's newspaper
CategorySection × 5
  └── "राजकारण" (grid) → 3 NewsCards
  └── "क्रीडा" (list) → 1 Featured + 4 Compact
  └── "व्यापार" (grid) → 3 NewsCards
  └── "मनोरंजन" (grid) → 3 NewsCards
  └── "नाशिक बातम्या" (list) → 1 Featured + 4 Compact
Footer
  └── Newsletter + Links + Social + Contact
```

### NewsCard Variants
| Variant    | Usage                        | Layout                              |
|-----------|------------------------------|-------------------------------------|
| `featured` | Hero article, list layouts   | Full-width image with text overlay  |
| `default`  | Grid sections                | Card with image top, content below  |
| `compact`  | Sidebar lists                | Small thumbnail + title (horizontal)|

### Article Page (`Article.tsx`)
```
Navbar
Article Header (title, category badge, author, date)
Social Share Buttons (Facebook, Twitter, Share)
Featured Image
Article Body (excerpt + static paragraphs)
Tags
Related Articles (up to 3 NewsCards from same category)
Footer
```

---

## 7. Design System

### Color Theme (Royal Blue)
```css
--primary: 228 73% 62%        /* Royal blue — buttons, links, accents */
--primary-foreground: 0 0% 100%
--secondary: 228 30% 92%
--background: 220 20% 97%     /* Light warm gray */
--card: 0 0% 100%
--headline: 228 40% 20%       /* Dark navy for headings */
--breaking-news: 228 73% 45%  /* Deep blue for breaking news bar */
--destructive: 0 84% 60%      /* Red for breaking badges */
```

### Fonts
| Token           | Font                        | Usage            |
|----------------|------------------------------|------------------|
| `font-marathi` | Tiro Devanagari Marathi      | Marathi body text|
| `font-headline`| Playfair Display             | English headings |
| `font-body`    | Source Sans 3                | English body text|

### Dark Mode
- Toggled via `.dark` class on `<html>`
- All colors use CSS variables that swap in dark mode
- Toggle button in Navbar top bar

---

## 8. Key Features

| Feature              | Status          | Notes                                    |
|---------------------|-----------------|------------------------------------------|
| Article browsing     | ✅ Working      | Static data, all routes functional        |
| Category filtering   | ✅ Working      | Filters `allArticles` by `categorySlug`   |
| Breaking news ticker | ✅ Working      | CSS animation, static headlines           |
| Dark mode            | ✅ Working      | Class-based toggle                        |
| Search               | ⚠️ UI only     | Input renders but no filter logic         |
| Newsletter signup    | ⚠️ UI only     | Form renders but no submission logic      |
| PDF download         | ⚠️ UI only     | Buttons render but no actual PDF files    |
| Contact form         | ⚠️ UI only     | Form renders but no submission logic      |
| Authentication       | ❌ Not built    | No login/signup system                    |
| Database             | ❌ Not built    | All data is static in `newsData.ts`       |
| CMS integration      | ❌ Not built    | No content management system              |

---

## 9. How to Extend

### To add a new article:
1. Open `src/data/newsData.ts`
2. Add an `Article` object to the appropriate category array
3. It will automatically appear on the homepage and category page

### To add a new category:
1. Add articles with a new `categorySlug` in `newsData.ts`
2. Add the category to the `categories` array in `Navbar.tsx`
3. Add the slug-to-name mapping in `Category.tsx` → `categoryNames`
4. Add a `CategorySection` in `Index.tsx`

### To connect a real backend:
1. Enable Lovable Cloud (provides database + auth + storage)
2. Create an `articles` table matching the `Article` interface
3. Replace static imports with React Query fetch calls
4. Add Row Level Security policies as needed

---

## 10. File Dependencies Graph

```
main.tsx
  └── App.tsx
        ├── Index.tsx
        │     ├── Navbar.tsx (logo.png)
        │     ├── BreakingNewsTicker.tsx
        │     ├── NewsCard.tsx (3 variants)
        │     ├── CategorySection.tsx → NewsCard.tsx
        │     ├── PDFDownloadBanner.tsx
        │     └── Footer.tsx (logo.png)
        ├── Category.tsx → Navbar, Footer, NewsCard
        ├── Article.tsx → Navbar, Footer, NewsCard
        ├── PDFArchive.tsx → Navbar, Footer
        ├── About.tsx → Navbar, Footer (logo.png)
        └── NotFound.tsx
```

All pages import from `@/data/newsData.ts` for content.
All components use `@/components/ui/*` shadcn primitives.
All styling flows through `index.css` CSS variables → `tailwind.config.ts` tokens.
