# Prisha — Portfolio

Premium, minimal, and built around motion rather than decoration: a
near-monochrome canvas (ink black / warm paper) with a single restrained
bronze accent, a light-weight serif paired with a clean sans, and every
interaction doing a little work.

## Run it

```bash
npm install
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`).

```bash
npm run build
```

builds to `dist/` for deployment (Netlify, Vercel, etc.).

## What's here

- **Preloader** (`src/components/Preloader.jsx`) — a number ticks up while
  a dark curtain sits over the page, then wipes away. One-time, on load
  only. Skipped entirely if the visitor has reduced motion on.
- **Floating pill navbar** (`Navbar.jsx`) — minimal, frosted glass, with a
  magnetic "Let's talk" button.
- **Magnetic buttons** (`MagneticButton.jsx`) — any button/link wrapped in
  this pulls gently toward the cursor and springs back on leave. Used on
  the nav CTA, hero buttons, and the contact email. This + the cursor are
  the site's two recurring motion signatures — don't add more on top.
- **Custom cursor** (`CustomCursor.jsx`) — a small dot that expands into a
  ring on any `[data-cursor="link"]`, and shows a contextual word (e.g.
  "View") when hovering a project frame via `data-cursor-label="View"`.
  Auto-disabled on touch devices.
- **Hero** — split-line text reveal (masked, staggered per word) timed to
  finish just as the preloader curtain lifts, so the whole intro reads as
  one sequence.
- **Marquee** (`Marquee.jsx`) — a slow, continuous ticker used under the
  hero and above the footer, so the page always has *something* moving,
  without adding visual noise.
- **Projects** — each row's image reveals with a curtain-wipe as it enters
  the viewport, and shows "View" under the custom cursor. A large italic
  index number (01, 02, 03) sits quietly behind each row.
- **Smooth scroll** (`src/lib/useSmoothScroll.js`) — the whole page runs
  through Lenis. Respects `prefers-reduced-motion`.

## Design tokens (`src/index.css`)

| Token      | Value      | Use                                  |
|------------|------------|----------------------------------------|
| `--ink`    | `#0c0c0d`  | Primary background                     |
| `--fg`     | `#f2f0ec`  | Primary text on dark                   |
| `--paper`  | `#f6f4f0`  | The one light section (About) — a break in the canvas |
| `--accent` | `#b08d5a`  | The single accent — used sparingly: index numbers, hover states, italic words |

Fonts: **Instrument Serif** (italic) for accent words and project titles,
**Inter** (light weight) for everything else — headline included, so the
type never tips into "template serif hero."

## Next steps

1. Swap the placeholder project images/copy in `Projects.jsx` — right now
   `.project-media-inner` is a gradient placeholder.
2. Point `mailto:hello@example.com` and the social links in `Contact.jsx`
   to your real ones.
3. If a project deserves its own case-study page, add React Router and
   lift `Navbar` + `CustomCursor` + `Preloader` above the route so they
   persist across pages.
