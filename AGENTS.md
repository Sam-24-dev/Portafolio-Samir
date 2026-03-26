# Portfolio Agent Guide

## Project

Samir Caizapasto portfolio website.

Current web stack:
- Vite
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

Reference content lives in:
- `README-PERSONAL.MD`
- `Proyectos-refactoring/`

## Product Strategy

This portfolio is a single website with staged positioning.

Current product direction:
- one portfolio, not multiple websites
- primary experience first: `Data Analyst`
- secondary experience later: `Data Engineer`
- rollout must be incremental
- do not break or disable the production site while iterating

## Core Positioning Rules

- The public-facing message is `Analyst-first`.
- Engineering depth should support credibility before it becomes a dedicated route.
- The site must communicate in layers:
  - layer 1: recruiter / HR clarity
  - layer 2: hiring-manager proof of impact
  - layer 3: technical depth for deeper review
- Avoid shipping all project detail at once on the homepage.
- Favor selective depth: featured case studies first, archive later.

## Sources Of Truth

Use these in order:

1. Website code in `src/`, `public/`, `index.html`
2. Strategy and positioning in `README-PERSONAL.MD`
3. Updated project evidence in `Proyectos-refactoring/`
4. Roadmap and iteration docs in `docs/`

When updating portfolio content, do not invent project claims.
Read the corresponding project docs first.

## Reference Project Map

Primary `Data Analyst` candidates:
- `Proyectos-refactoring/customer-profile-analytics-powerbi/`
- `Proyectos-refactoring/eSports-Analytics-Dashboard/`
- `Grocery Sales BI Dashboard` already represented in the current site

Bridge projects:
- `Proyectos-refactoring/Analisis-Cultivo-Arroz/`
- `Proyectos-refactoring/Analisis-Ping-Pong/`
- NASA project remains valid but should not dominate the portfolio

Future `Data Engineer` route anchors:
- `Proyectos-refactoring/Technology-trend-analysis-platform/`
- `Proyectos-refactoring/RideFare-ETL-Pipeline/`

## Working Rules

- Keep the live portfolio usable at every stage.
- Prefer small, reviewable increments.
- Do not redesign everything in one release.
- Keep mobile performance and readability as first-class constraints.
- Preserve the current stack unless a strong reason is documented.
- Treat `Proyectos-refactoring/` as reference material by default, not as the main app to edit.
- Do not edit the reference projects unless explicitly asked.
- Do not remove working features from the portfolio without replacing their purpose.

## UX And Design Rules

- Build for mobile first, then expand to tablet and desktop.
- Use a premium but restrained visual language.
- Avoid generic template aesthetics.
- Do not overload the hero with too many competing messages.
- Every interactive element must remain obvious on touch devices.
- Respect `prefers-reduced-motion` when adding or revising motion.
- Prefer strong hierarchy, fewer words, and better proof over large blocks of text.

## Known Portfolio State

Current portfolio strengths:
- solid section-based structure
- theme toggle works and persists
- bilingual content works
- projects and contact sections already exist

Known gaps:
- contact form still uses `mailto`
- language does not persist and does not auto-detect browser preference
- Open Graph image is referenced but missing
- favicon points to `/vite.svg`, which is not shipped correctly in production
- project hierarchy is too flat
- some docs are outdated
- some dependencies are unused

## Standard Commands

Install:
```bash
npm install
```

Dev server:
```bash
npm run dev
```

Build:
```bash
npm run build
```

Lint:
```bash
npm run lint
```

## Validation Checklist For Any Change

Before closing an iteration:
- run `npm run build`
- run `npm run lint`
- validate desktop layout
- validate mobile layout
- verify no horizontal scroll on mobile
- verify nav, theme toggle, language toggle, CV, and contact still work
- verify no unsupported project claims were introduced

## Documentation Map

- Main roadmap: `docs/roadmap-v2.md`
- Iteration index: `docs/iterations/README.md`
- Phase 1: `docs/iterations/phase-01-analyst-foundation.md`
- Phase 2: `docs/iterations/phase-02-analyst-depth.md`
- Phase 3: `docs/iterations/phase-03-conversion-and-quality.md`
- Phase 4: `docs/iterations/phase-04-engineering-route.md`
- Phase 5: `docs/iterations/phase-05-ops-and-automation.md`

## Definition Of Success

The V2 roadmap is succeeding when:
- the homepage clearly sells Samir as a strong junior data professional
- the first release improves analyst positioning without confusing the audience
- the portfolio gains stronger project proof and recruiter trust
- the engineering route can be added later without restructuring from scratch
