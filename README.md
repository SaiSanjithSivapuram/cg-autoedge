# CG AutoEdge

Landing page for CG AutoEdge — a professional car deal negotiation service. Clients submit a vehicle request and expert negotiators handle all dealership communication to secure the best possible price.

## Stack

- **Next.js 16.2.4** (App Router, Turbopack)
- **MUI v5** — primary component library
- **Tailwind v4** — utilities only (no preflight)
- **Framer Motion v12** — scroll-reveal animations
- **Redux Toolkit** — contact form state
- **TypeScript**

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/               # Next.js App Router pages + layout
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # Landing page sections (Server Components)
│   ├── forms/         # ContactForm (Client Component)
│   └── ui/            # Shared UI utilities (FadeInUp)
├── lib/               # Redux store, slices, typed hooks
└── providers/         # MuiThemeProvider (emotion SSR), ReduxProvider
```

See `CLAUDE.md` for full architecture details, design system, and conventions.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BASE_URL` | Canonical site URL | `https://cgautoedge.com` |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page (Hero, Stats, How It Works, Services, Testimonials, FAQ, CTA) |
| `/contact` | Free quote request form |
