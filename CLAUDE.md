@AGENTS.md

# CG AutoEdge — Project Context

## What This Is

Landing page + contact form for **CG AutoEdge**, a car deal negotiation service. Clients submit a vehicle request; human negotiators handle all dealership communication and return the best price secured.

**Pages:**
- `/` — 7-section marketing landing page (Hero → Stats → How It Works → Services → Testimonials → FAQ → CTA)
- `/contact` — quote request form with sidebar contact details

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 16.2.4 (App Router) | See AGENTS.md — read docs before coding |
| UI | MUI v5 (`@mui/material`) | Primary component library |
| Styling | Tailwind v4 + MUI `sx` prop | Tailwind utilities-only (`@import "tailwindcss/utilities"`) — no preflight, MUI CssBaseline handles resets |
| Fonts | `next/font/google` | Self-hosted via Next.js, CSS variables injected at `<html>` |
| Animation | Framer Motion v12 | Used for scroll-reveal via `FadeInUp` component |
| State | Redux Toolkit + react-redux | Only used for contact form status (`contactSlice`) and UI state (`uiSlice`) |
| Language | TypeScript |  |

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, Navbar, Footer
│   ├── page.tsx            # Home page — assembles all section components
│   ├── globals.css         # Design tokens (CSS vars) + skip-link + Tailwind utilities import
│   ├── contact/page.tsx    # Contact page — ContactForm + sidebar info
│   ├── robots.ts           # Robots.txt generation
│   └── sitemap.ts          # Sitemap generation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Fixed navbar with scroll shadow + mobile drawer
│   │   └── Footer.tsx      # 4-column footer with brand, services, company, CTA
│   ├── sections/           # One file per landing page section (all Server Components)
│   │   ├── HeroSection.tsx
│   │   ├── StatsBar.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FaqSection.tsx
│   │   └── CtaSection.tsx
│   ├── forms/
│   │   └── ContactForm.tsx  # 'use client' — Redux-connected, multi-field form
│   └── ui/
│       └── FadeInUp.tsx     # 'use client' — Framer Motion scroll-reveal wrapper
├── lib/
│   ├── store.ts
│   ├── hooks.ts             # useAppDispatch / useAppSelector typed hooks
│   └── features/
│       ├── contact/contactSlice.ts
│       └── ui/uiSlice.ts
└── providers/
    ├── MuiThemeProvider.tsx  # Emotion SSR cache + MUI theme definition
    └── ReduxProvider.tsx
```

---

## Design System

### Color Tokens (defined in `globals.css` and MUI theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--ae-primary` | `#1E293B` | Navbar, dark surfaces |
| `--ae-primary-dark` | `#0F172A` | Deepest dark (hero gradient end, footer) |
| `--ae-secondary` | `#334155` | Secondary dark surfaces |
| `--ae-accent` | `#DC2626` | CTAs, highlights, icons — the only red |
| `--ae-accent-hover` | `#B91C1C` | Hover state for red elements |
| `--ae-bg` | `#F8FAFC` | Default page background |
| `--ae-muted` | `#E9EDF1` | Alternate section backgrounds |
| `--ae-muted-fg` | `#64748B` | Secondary text |
| `--ae-border` | `#E2E8F0` | Card borders, dividers |

**Section alternation pattern:** `#F8FAFC` and `#E9EDF1` alternate between sections to create visual rhythm without hard dividers.

**Hero/CTA backgrounds:** `linear-gradient(135deg, #0F172A 0%, #334155 100%)`

### Typography

| Variable | Font | Usage |
|----------|------|-------|
| `--font-lexend` | Lexend | All headings (h1–h6), navbar brand, buttons, overlines |
| `--font-source-sans` | Source Sans 3 | All body text |

Fonts are loaded via `next/font/google` in `layout.tsx` and injected as CSS variables onto `<html>`. MUI theme references them as `var(--font-lexend)` with fallbacks. **Do not use `@import` from Google Fonts** — that was removed in favour of next/font for FOIT prevention.

### MUI Theme (in `MuiThemeProvider.tsx`)

Key overrides to be aware of:
- `MuiButton` — `textTransform: none`, Lexend font, `borderRadius: 8`, `cursor: pointer`
- `MuiTextField` — `fullWidth` by default, focus ring uses `#DC2626`
- `MuiCard` — `border: 1px solid #E2E8F0`, subtle shadow. **No hover lift** — removed to avoid false affordance on non-interactive cards
- `MuiAccordion` — `borderRadius: 10px`, custom padding, no default divider (`&:before { display: none }`)
- `MuiLink` — defaults to Next.js `<Link>` component

**MUI palette:** `primary` = navy (`#1E293B`), `secondary` = red (`#DC2626`). CTAs use `color="secondary"` (red buttons).

### Animations

All scroll-reveal animations go through `src/components/ui/FadeInUp.tsx`:
- Uses Framer Motion `useInView` (`once: true`, `-60px` margin)
- Animates `opacity: 0 → 1`, `y: 24 → 0`, duration 450ms, ease `[0.22, 1, 0.36, 1]`
- Stagger via `delay` prop (e.g. `delay={i * 0.08}`)
- `prefers-reduced-motion` is respected globally via CSS in `MuiCssBaseline` (all transition/animation durations set to `0.01ms`)

---

## Key Conventions

### Server vs Client Components
- All section components (`HeroSection`, `StatsBar`, etc.) are **Server Components** — no `'use client'` directive
- `Navbar`, `FaqSection`, `ContactForm`, `FadeInUp`, `MuiThemeProvider`, `ReduxProvider` are Client Components

### Hardcoded Data
All copy (stats, services, testimonials, FAQ, steps) is **hardcoded in the component files** as `const` arrays. There is no CMS or API. To update content, edit the relevant section file directly.

### Form State
`ContactForm` manages local field state via `useState` and dispatches submit status (`'idle' | 'loading' | 'success' | 'error'`) to Redux. The actual API call is currently a `setTimeout` placeholder — replace with real endpoint when backend is ready.

**Validation behaviour:** Validates on `handleSubmit`. After first submission attempt (`wasSubmitted = true`), individual fields re-validate on `onBlur`. Errors do NOT clear on keystroke — they clear on successful blur re-validation.

### Structured Data
- `LocalBusiness` JSON-LD in `layout.tsx` `<head>`
- `FAQPage` JSON-LD rendered inside `FaqSection.tsx` via `<script type="application/ld+json">`

### Accessibility
- Skip link (`.skip-link`) in layout, visible on focus
- All sections have `aria-labelledby` pointing to their heading
- All decorative SVGs have `aria-hidden="true"`
- Star ratings have `aria-label="5 out of 5 stars"` on the container
- Success state: `role="status" aria-live="polite"`; error alert: `role="alert" aria-live="assertive"`
- `aria-busy` on submit button during loading

---

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `NEXT_PUBLIC_BASE_URL` | Canonical URL for metadata and JSON-LD | `https://cgautoedge.com` |

---

## What Doesn't Exist Yet

- Real form submission endpoint (currently a `setTimeout` mock in `ContactForm.tsx`)
- `/about` page (linked in Footer but not created)
- `/privacy-policy` and `/terms` pages (linked in Footer)
- `hero-pattern.svg` and `og-image.png` (referenced but not in repo)
- Dark mode support
- Any authentication or user accounts
