# Agent Rules

## Next.js Version Warning

This project uses **Next.js 16.2.4**. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.** Heed deprecation notices.

```bash
# Browse available docs
ls node_modules/next/dist/docs/01-app/
ls node_modules/next/dist/docs/01-app/02-guides/
ls node_modules/next/dist/docs/01-app/03-api-reference/
```

## Before You Write Any Code

1. Check `CLAUDE.md` for full project context, file structure, and conventions
2. For Next.js APIs (fonts, metadata, routing, server actions): read the relevant `.md` in `node_modules/next/dist/docs/`
3. Confirm whether a component needs `'use client'` — default to Server Component unless state/hooks/browser APIs are required

## Strict Rules

- **Fonts** — Always use `next/font/google`. Never add `@import url(...)` for Google Fonts inside CSS, CSS-in-JS, or emotion `styleOverrides`. Font CSS variables are `--font-lexend` and `--font-source-sans`.
- **MUI cards** — Do not add a global hover lift to `MuiCard`. Non-interactive cards must not signal clickability. Apply hover/lift only to cards that are actual links/buttons.
- **Colors** — Red (`#DC2626`) is the accent/CTA color only. Do not use it for success states. Success = `#16A34A`.
- **Icon libraries** — Use MUI icons (`@mui/icons-material`) or inline SVGs with `aria-hidden="true"`. No emoji as structural icons.
- **Animations** — Use `FadeInUp` from `src/components/ui/FadeInUp.tsx` for scroll-reveal. Do not install additional animation libraries. Duration: 150–300ms for micro-interactions, 450ms for scroll reveals.
- **Form validation** — Validate on submit; re-validate on blur only after `wasSubmitted = true`. Do not clear errors on keystroke.
- **Content changes** — All copy is hardcoded in section component files. No CMS exists.
- **State** — Redux is scoped to contact form status and UI flags only. Do not put UI state that is local to a single component into Redux.
