# AURÉLIA — Premium Clothing Landing Page

A luxury, editorial landing page for a regenerative-couture clothing brand,
built with **Next.js 14 · Tailwind CSS · Framer Motion · GSAP ScrollTrigger ·
React Three Fiber**.

## Design system

- **Aesthetic** — luxury editorial: obsidian + warm ivory + champagne gold
  with terracotta/wine accents, film grain + vignette atmosphere.
- **Typography** — Bodoni Moda (display serif) + Jost (geometric sans),
  loaded from Google Fonts with elegant serif fallbacks.
- **Motion language** — `ease-out` for entrances, `ease-in-out` for on-screen
  movement (per the *web-animation-design* skill), GPU-only transforms,
  full `prefers-reduced-motion` fallbacks.

## Skills used (official, high-install sources only)

| Skill | Source | Purpose |
|---|---|---|
| web-design-guidelines | vercel-labs/agent-skills (~694K installs) | design review heuristics |
| frontend-design | vercel-labs/agent-eval (~2K) | distinctive, non-generic aesthetics |
| web-animation-design | vercel-labs/open-agents | easing, stagger, performance, a11y |
| react-three-fiber | vercel-labs/json-render (~2K) | 3D scene patterns |

All passed the CLI security check (Safe / 0 alerts / Low Risk).

## Features

- Luxury **preloader** with wordmark reveal + counter + curtain exit
- **Dual-layer magnetic custom cursor** (rAF + lerp, fine pointers only)
- Kinetic **hero** with per-letter staggered title, **custom GLSL silk shader**
  + gold-dust particles, scroll parallax
- Infinite editorial **marquee** ticker
- Collection grid with **3D tilt cards** + cursor-follow shine
- **Pinned horizontal scrollytelling** (GSAP ScrollTrigger + container
  animation image parallax + progress rail)
- **3D product showcase** — lathe-geometry dress form, champagne metal,
  procedural studio lighting (Lightformers, no external HDRI)
- Craft section with parallax banner + **animated stat counters**
- Auto-rotating **testimonials** + press row
- Newsletter CTA with animated success state + rich footer
- Fully responsive, mobile menu, semantic/SEO metadata

## Run it

```bash
cd /home/sahilranpariya/Work/personal_projects/premium-clothing-landing
npm install --legacy-peer-deps
npm run dev      # → http://localhost:3000
npm run build    # production build (verified ✓)
npm start        # serve the production build
```

## GitHub Pages Deployment

The automated deployment workflow is configured in `.github/workflows/deploy.yml`.

To fix the `404 - Ensure GitHub Pages has been enabled` error during deployment:
1. Go to your repository on GitHub: `https://github.com/sahil030804/aurelia-landing/settings/pages`
2. Under **Build and deployment** -> **Source**, select **GitHub Actions** (instead of *Deploy from a branch*).
3. Re-run the GitHub Actions workflow or push a new commit to `main`.
