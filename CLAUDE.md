@AGENTS.md

# CG AutoEdge — Project Context

## What This Is

Landing page + contact wizard + pricing page for **CG AutoEdge**, a car deal negotiation service. Clients submit a vehicle request; human negotiators handle all dealership communication and return the best price secured.

**Pages:**
- `/` — 7-section marketing landing page (Hero → Stats → How It Works → Services → Testimonials → FAQ → CTA)
- `/contact` — 5-step quote wizard + sidebar with contact details and pricing link
- `/pricing` — Full pricing breakdown (3 tiers, cost example, FAQ, CTA)

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 16.2.4 (App Router) | See AGENTS.md — read docs before coding |
| UI | MUI v5 (`@mui/material`) | Primary component library |
| Styling | Tailwind v4 + MUI `sx` prop | Tailwind utilities-only (`@import "tailwindcss/utilities"`) — no preflight, MUI CssBaseline handles resets |
| Fonts | `next/font/google` | Self-hosted via Next.js, CSS variables injected at `<html>` |
| Animation | Framer Motion v12 | Scroll-reveal via `FadeInUp`; step transitions + interactive animations in wizard and pricing cards |
| State | Redux Toolkit + react-redux | Only used for contact form status (`contactSlice`) and UI state (`uiSlice`) |
| Language | TypeScript |  |

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, Navbar, Footer
│   ├── page.tsx                # Home page — assembles all section components
│   ├── globals.css             # Design tokens (CSS vars) + skip-link + Tailwind utilities import
│   ├── contact/page.tsx        # Contact page — ContactForm wizard + sidebar
│   ├── pricing/page.tsx        # Pricing page — Server Component, imports PricingCards
│   ├── robots.ts               # Robots.txt generation
│   └── sitemap.ts              # Sitemap generation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed navbar with scroll shadow + mobile drawer
│   │   └── Footer.tsx          # 4-column footer with brand, services, company, CTA
│   ├── sections/               # One file per landing page section (all Server Components)
│   │   ├── HeroSection.tsx
│   │   ├── StatsBar.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FaqSection.tsx
│   │   └── CtaSection.tsx
│   ├── forms/
│   │   └── ContactForm.tsx     # 'use client' — 5-step Redux-connected wizard
│   ├── pricing/
│   │   └── PricingCards.tsx    # 'use client' — animated 3-tier pricing cards
│   └── ui/
│       └── FadeInUp.tsx        # 'use client' — Framer Motion scroll-reveal wrapper
├── lib/
│   ├── store.ts
│   ├── hooks.ts                # useAppDispatch / useAppSelector typed hooks
│   └── features/
│       ├── contact/contactSlice.ts   # submitStatus, errorMessage, contactData, resetContact
│       └── ui/uiSlice.ts
└── providers/
    ├── MuiThemeProvider.tsx    # Emotion SSR cache + MUI theme definition
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

**Dark page backgrounds** (contact, pricing): `#0D1117` body, `linear-gradient(135deg, #080C14 0%, #1A2440 100%)` hero.

### Typography

| Variable | Font | Usage |
|----------|------|-------|
| `--font-lexend` | Lexend | All headings (h1–h6), navbar brand, buttons, overlines, badges |
| `--font-source-sans` | Source Sans 3 | All body text |

Fonts are loaded via `next/font/google` in `layout.tsx` and injected as CSS variables onto `<html>`. MUI theme references them as `var(--font-lexend)` with fallbacks. **Do not use `@import` from Google Fonts** — that was removed in favour of next/font for FOIT prevention.

### MUI Theme (in `MuiThemeProvider.tsx`)

Key overrides to be aware of:
- `MuiButton` — `textTransform: none`, Lexend font, `borderRadius: 8`, `cursor: pointer`
- `MuiTextField` — `fullWidth` by default, focus ring uses `#DC2626`
- `MuiCard` — `border: 1px solid #E2E8F0`, subtle shadow. **No hover lift** — removed to avoid false affordance on non-interactive cards
- `MuiAccordion` — `borderRadius: 10px`, custom padding, no default divider (`&:before { display: none }`)
- `MuiLink` — **already defaults to Next.js `<Link>` component** via theme override

**MUI palette:** `primary` = navy (`#1E293B`), `secondary` = red (`#DC2626`). CTAs use `color="secondary"` (red buttons).

### Dark-page Input Styles (`darkField`)

When TextFields sit on a dark background (`#0D1117`), apply the `darkField` sx object defined in `ContactForm.tsx`:
- Input bg: `rgba(15,23,42,0.7)`, text: `#F1F5F9`
- Label: `#64748B`, focused label: `#DC2626`
- Border: `rgba(51,65,85,0.7)` → hover `#475569` → focused `#DC2626`

### Animations

**Scroll-reveal:** All sections use `src/components/ui/FadeInUp.tsx`:
- `useInView` (`once: true`, `-60px` margin)
- `opacity: 0 → 1`, `y: 24 → 0`, 450ms, ease `[0.22, 1, 0.36, 1]`
- Stagger via `delay` prop (e.g. `delay={i * 0.08}`)

**Step transitions (wizard):** `AnimatePresence mode="wait"` with fade + y-shift variants. Direction tracked via `direction` state (1 = forward, -1 = back).

**Card hover:** `motion.div whileHover={{ y: -8 }}` — used on pricing cards. Do **not** add this to non-interactive `MuiCard` components (false affordance).

**Ease arrays in Framer Motion v12** must be cast: `[0.22, 1, 0.36, 1] as [number, number, number, number]` to satisfy TypeScript types.

**`prefers-reduced-motion`** is respected globally via CSS in `MuiCssBaseline`.

---

## Key Conventions

### Server vs Client Components

- All `sections/` components are **Server Components** — no `'use client'`
- `Navbar`, `FaqSection`, `ContactForm`, `PricingCards`, `FadeInUp`, `MuiThemeProvider`, `ReduxProvider` are Client Components
- Keep page files (`app/*/page.tsx`) as Server Components; import Client Components into them
- New interactive components go in a named subfolder: e.g. `components/pricing/`, `components/forms/`

### ⚠️ Critical: Never pass function components as props from Server Components

**Do not** use `component={Link}` or `component={NextLink}` on MUI components inside Server Components. Next.js cannot serialize function references across the server→client boundary — it throws a 500 error.

```tsx
// ❌ WRONG in a Server Component — crashes with serialization error
<Button component={Link} href="/contact">CTA</Button>

// ✅ CORRECT in a Server Component — MUI Button with href renders as <a>
<Button href="/contact">CTA</Button>

// ✅ CORRECT — MuiLink already uses Next.js Link via theme, no component prop needed
<MuiLink href="/pricing">View pricing</MuiLink>

// ✅ CORRECT in a 'use client' component — function prop is fine client-side
<Button component={NextLink} href="/contact">CTA</Button>
```

### Hardcoded Data
All copy (stats, services, testimonials, FAQ, steps, pricing tiers) is **hardcoded in the component files** as `const` arrays. There is no CMS or API. To update content, edit the relevant component directly.

### Contact Wizard (`ContactForm.tsx`)

5-step wizard — canonical step indices 0–4:

| Step | Name | Notes |
|------|------|-------|
| 0 | Vehicle Condition | New / Pre-Owned selection cards with animated SVGs |
| 1 | Vehicle ID | Tab switcher: VIN input or "Enter Details Manually" |
| 2 | Vehicle Details | Year, Make, Model, Trim, Colour, Budget, Mileage — **skipped if VIN path** |
| 3 | Additional Info | Trade-in toggle, financing toggle, timeline, notes |
| 4 | Contact Details | Name, email, phone, preferred contact method |

Navigation skips Step 2 in both forward and backward directions when `identMethod === 'vin'`. Progress bar marks Step 2 as "Via VIN" with a × icon on the VIN path.

Redux dispatches: `setSubmitStatus`, `setErrorMessage`, `resetContact`, `setContactData` (all exported from `contactSlice`).

The actual API call is a `setTimeout` placeholder — replace with real endpoint when backend is ready.

**Validation:** Validates on Next click per step. After first submit attempt (`wasSubmitted = true`), individual fields re-validate on `onBlur`. Errors do NOT clear on keystroke.

### Pricing Page (`/pricing`)

Three tiers (hardcoded in `PricingCards.tsx`):
1. **Consultation Call** — $0 / first 10 min, $50 per additional 30 min
2. **Vehicle Deep-Dive** — $100 flat fee (optional, recommended for vehicles >$25k)
3. **Deal Success Fee** — 1% of final negotiated price, only on accepted deals

Cost example in `pricing/page.tsx` is computed from constants (`EXAMPLE_VEHICLE`) — update those constants to change the sample numbers.

### Contact Page Layout

Both Grid items are `xs={12} lg={12}` — form and sidebar stack full-width on all viewports. This is intentional.

### Structured Data
- `LocalBusiness` JSON-LD in `layout.tsx` `<head>`
- `FAQPage` JSON-LD rendered inside `FaqSection.tsx` via `<script type="application/ld+json">`

### Accessibility
- Skip link (`.skip-link`) in layout, visible on focus
- All sections have `aria-labelledby` pointing to their heading
- All decorative SVGs have `aria-hidden="true"`
- Star ratings have `aria-label="5 out of 5 stars"` on the container
- Wizard: `role="radio"` + `aria-checked` on selection cards; `role="switch"` + `aria-checked` on toggles; `role="tab"` + `aria-selected` on tab switcher
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
