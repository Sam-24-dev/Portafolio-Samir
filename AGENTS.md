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
- `src/data/`
- `docs/`
- source project repositories and READMEs referenced by each portfolio project

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
2. Route-aware content datasets in `src/data/`
3. Roadmap and release docs in `docs/`
4. Source project repositories and READMEs referenced by each portfolio project

When updating portfolio content, do not invent project claims.
Read the corresponding project docs first.

## Reference Project Map

Primary `Data Analyst` candidates:
- `Customer Profile Analytics Dashboard`
- `eSports Analytics Dashboard LATAM`
- `Grocery Sales BI Dashboard` already represented in the current site

Bridge projects:
- `Rice Crop Analytics Platform`
- `Statistical Analysis: Ping Pong Precision Model`
- NASA project remains valid but should not dominate the portfolio

Future `Data Engineer` route anchors:
- `Technology Trend Analysis Platform`
- `RideFare ETL Pipeline`

## Working Rules

- Keep the live portfolio usable at every stage.
- Prefer small, reviewable increments.
- Do not redesign everything in one release.
- Keep mobile performance and readability as first-class constraints.
- Preserve the current stack unless a strong reason is documented.
- Treat source project repositories as reference material by default, not as the main app to edit.
- Do not edit external reference projects unless explicitly asked.
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
- bilingual content works with persistence and browser detection
- real contact form and route-aware metadata are already in place
- analyst and engineering routes already share one shell without conflicting positioning
- core public assets for SEO and trust are already shipped

Current focus:
- keep quality gates strict as the app grows
- protect content and metadata against regressions
- keep docs aligned with the real shipped state
- avoid reopening V2 scope with unnecessary feature work

Latest implementation state:
- the production site is already running with the post-hotfix rendering fix from `main`
- hero motion is shared across `Data Analyst` and `Data Engineer`
  - orbit rotates on desktop, tablet, and mobile unless `prefers-reduced-motion` disables it
  - orbit pauses on hover / focus / tap when a tooltip is active
  - title phrases use the same typewriter-style behavior across both profiles, with gentler pacing on compact devices
- profile-specific certifications are now split by route
  - analyst certifications stay inside `About`
  - engineer certifications render in their own in-page section after stack and before how-i-work
  - there is no navbar item or new route for certifications
- certification data now lives in `src/data/profileCertifications.ts`
- reusable certification UI now lives in:
  - `src/components/CertificationGroups.tsx`
  - `src/components/EngineeringCertifications.tsx`
- engineer certifications currently emphasize:
  - verified: `ETL and ELT in Python`
  - program: `Data-Driven Decision Specialist`
  - recognition: `NASA Space Apps Challenge 2025`
- analyst certifications currently emphasize:
  - `Microsoft Certified: Power BI Data Analyst Associate`
  - `Data Analyst Associate`
  - `Microsoft Office Specialist: Excel Associate`
  - `Data-Driven Decision Specialist`
  - `NASA Space Apps Challenge 2025`
- the certifications renderer is responsive:
  - when verified credentials > 1, it uses a two-column grid from `md`
  - when verified credentials = 1, it collapses to a single-column grid to avoid dead space
- the current active work after launch is polish and maintenance, not route expansion

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
- run `npm run verify`
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

## Handoff To Another AI Editor

Use this section when moving the project to another AI editor (Cursor, etc.) so the new assistant can pick up where you left off.

### Current branch state (update before merge)

- Date: 2026-05-01
- Branch: `post-launch-improvements` (tracking `origin/main`)
- Last commit: `2cc9616` — fix: restore production render stability (#13)
- Local review: user confirmed the app looks good locally on 2026-05-01.
- Working tree: uncommitted changes present.
- Modified files:
  - `AGENTS.md`
  - `docs/roadmap-v2.md`
  - `src/App.test.tsx`
  - `src/components/About.test.tsx`
  - `src/components/About.tsx`
  - `src/components/EngineeringHero.test.tsx`
  - `src/components/EngineeringHero.tsx`
  - `src/components/EngineeringProjects.test.tsx`
  - `src/components/Hero.test.tsx`
  - `src/components/Hero.tsx`
  - `src/components/LanguageSelector.tsx`
  - `src/components/Navbar.test.tsx`
  - `src/components/Navbar.tsx`
  - `src/components/OrbitTechRing.tsx`
  - `src/components/Projects.test.tsx`
  - `src/components/Projects.tsx`
  - `src/components/StackMotion.test.tsx`
  - `src/components/ThemeToggle.tsx`
  - `src/data/engineeringContent.ts`
  - `src/data/translations.ts`
  - `src/hooks/useStackAmbientMotion.ts`
  - `src/index.css`
  - `src/pages/EngineeringPage.tsx`
- New files (untracked):
  - `.cursorrules`
  - `src/components/CertificationGroups.tsx`
  - `src/components/EngineeringCertifications.test.tsx`
  - `src/components/EngineeringCertifications.tsx`
  - `src/data/profileCertifications.ts`
  - `src/hooks/useHeroMotionPolicy.ts`
  - `src/hooks/useHeroTitleRotation.test.ts`
  - `src/hooks/useHeroTitleRotation.ts`
- Notes:
  - Windows line-ending warnings (LF → CRLF) were reported for multiple files. Avoid unintended formatting churn.
- Validation status:
  - Not run in this handoff. Run `npm run verify` before merge.

### Git + branch workflow (post-change)

- Confirm the latest changes look good locally.
- Commit on the current branch, push, open a PR.
- Merge only after PR checks and manual review pass.
- Clone `main` into the new editor workspace.

### Read-first files (keep context consistent)

- `AGENTS.md` (this file)
- `README.md`
- `SETUP-GUIDE.md`
- `docs/roadmap-v2.md`
- `docs/iterations/README.md`
- `docs/release-workflow.md`
- `src/data/` (content source of truth)

### Local run quickstart

- `npm install`
- `npm run dev`

### MCP + tooling snapshot (configured outside repo)

These are configured in the editor’s MCP settings, not inside this repository.

Servers currently used:
- chrome-devtools
- github
- context7
- toolbox-db
- TestSprite
- playwright
- powerbi
- stitch

Editor plugins in use (if supported by the target editor):
- vercel
- browser-use
- documents
- spreadsheets
- presentations

Security note: API keys live in the editor config/profile. Do not commit secrets to this repo. Use placeholders in documentation.

### Local skills catalog (editor-specific)

Skills available on this machine (verify in the new editor):
- python-patterns
- get-search-view-results
- agent-customization
- typescript-upgrade
- modernization-integration-tests

Typical location: `C:\Users\USER\.agents\skills\` (may vary by editor).
