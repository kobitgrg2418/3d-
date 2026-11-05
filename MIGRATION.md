# 30Rentals visual-layer migration

Only the visual layer changed. No routes, copy, features or data logic were touched.

## Tokens (src/app/globals.css, mirrored in src/lib/tokens.ts)
| Token | Value | Use |
|---|---|---|
| --white | #FFFFFF | page, cards, text on black/orange |
| --black / --black-surface | #000000 / #0A0A0A | primary text / large surfaces |
| --grey-100 / 300 / 600 | #F5F5F7 / #D2D2D7 / #6E6E73 | surface / borders / secondary text |
| --orange (+hover, press) | #FF6A00 (#E55F00, #CC5400) | the only accent |

## Old colour -> new token
| Old | New |
|---|---|
| #0b0f19, #000, #000000 | --black |
| #fff, #ffffff, light blues (#e8f2ff …) | --white |
| #050505, #050506, #0d0d0d, #090a0c, #111, #1c1c20, #2b2b2b, #232733, #2a2a30, #1f2937 | --black-surface |
| #525866, #667085, #344054, #868c98, #8a8a8a, #8b8b90, #555 | --grey-600 |
| #e5e7eb, #eaecf0, #d0d5dd, #d8d8d8, #ddd, #cfcfcf, #e5e5e5 | --grey-300 |
| #f0f2f5, #f4f5f7, #f9fafb, #f8f9fa/b, #f2f4f7, #f2f2f2, #edf0f5, #fafafa … | --grey-100 (--grey-300 on borders) |
| #e11d2e, #ff1a10, #e5322d, #4ade80 (red / green) | --orange |
| #f02538 | --orange-hover |
| rgba(0,0,0,a) / rgba(255,255,255,a) | color-mix(var(--black\|--white) a%, transparent) |
| Tailwind blue/red/green/emerald/amber/purple/orange-*, gray-* | orange / black / grey tokens |

The Tailwind palette is replaced (`--color-*: initial`), so off-system colours cannot be used.

## Other changes
- Fonts: Inter self-hosted via @fontsource (400/500/600/700); Space Grotesk and the Google Fonts import removed. Weights used on screen: 400 and 600. Uppercase and text-shadow removed.
- Type scale as CSS variables (hero 80/48 … caption 14/13); old font sizes mapped to the nearest step.
- Shapes: cards 24px radius / 32px padding, pill buttons 48px, inputs 14px radius / 52px, container 1120px, section padding 128/64.
- Shadows: neutral black 8–10%; glows removed. Decorative and button gradients removed.
- Motion: 250ms, cubic-bezier(0.25, 0.1, 0.25, 1); reduced-motion respected globally.
- Logo: line-only SVG (public/brand/logo-black|white|mark|mono.svg), favicon.svg + PNG 16/32/180/512 + favicon.ico, og-image.png; used via src/components/Logo.tsx in the hero nav, Navbar and footer; metadata in layout.tsx.
- Spinner: src/components/Spinner.tsx (24px orange wheel). The animated preloader was removed on request.

## Files changed
src/app/{globals.css, layout.tsx, admin, design-idea, experience, faq, fleet, fleet/[slug], how-it-works, owners, room}/…
src/components/{RentalsHero, CarentFooter, Navbar, MegaMenu, MobileMenu, CinematicHero, CarScene, VideoScrub, ServiceStepCard, ImageUpload}.tsx and widgets/*
New: src/lib/tokens.ts, src/components/{Logo,Spinner}.tsx, public/brand/*, public/icons/*, public/favicon.svg, public/og-image.png

## Checks
- No hex/rgb/hsl values or off-palette Tailwind colours remain outside globals.css and tokens.ts.
- Home renders at 1440, 834 and 390 with no console errors.
- Not done: Lighthouse scores, spacing snap on per-page inline styles, full-page visual review of inner pages.
- Black-to-transparent photo scrims were kept for text legibility.
- `next build` fails on type errors that were in the original code (CKEditor typings, Navbar `setActiveMenu`, DesignCardWidget `cards`, `LayoutProps`).
