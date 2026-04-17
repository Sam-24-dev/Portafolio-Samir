# Samir Caizapasto Portfolio

Professional bilingual portfolio built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

The product is designed as one portfolio with two intentional profile routes:
- `/` for the `Data Analyst` experience
- `/engineering` for the `Data Engineer` experience

It is optimized for:
- recruiter clarity on first view
- stronger proof for hiring managers
- optional technical depth without turning the homepage into a dashboard

## Live Site

- Production: `https://portafolio-samir-tau.vercel.app/`

## Product Overview

This portfolio ships:
- bilingual English and Spanish content
- analyst-first default positioning
- engineering route on the same shared shell
- route-aware metadata and canonical handling
- featured projects and case-study depth
- shared contact form backed by `/api/contact`
- dark and light themes with persisted preference
- responsive layouts across mobile, tablet, and desktop

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Floating UI
- Vitest + Testing Library
- Vercel Analytics
- Vercel Serverless Function for contact delivery

## Local Development

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## Quality Workflow

Run the full local validation suite before opening a PR:

```bash
npm run verify
```

This command includes:
- public asset validation
- content and metadata integrity checks
- lint with zero warnings
- TypeScript typecheck
- test suite
- production build

Useful individual commands:

```bash
npm run check:public
npm run check:content
npm run lint:ci
npm run typecheck
npm run test
```

## Environment Variables

The contact form posts to `api/contact.ts` and expects:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

Use `.env.local` for local development and keep public examples free of secrets.

## Project Structure

```text
src/
  components/   route sections, shared UI, and interaction surfaces
  context/      language and theme providers
  data/         analyst/engineering content and translations
  hooks/        route, metadata, motion, and interaction hooks
  lib/          shared helpers, analytics, and route maps
  pages/        analyst and engineering route entry pages
api/
  contact.ts    Vercel serverless contact endpoint
public/
  cv/           downloadable CV
  certificates/ public certificate assets
  images/       profile, project, case-study, and icon assets
scripts/
  check-public-assets.mjs
  check-content-integrity.mjs
docs/
  roadmap-v2.md
  release-workflow.md
```

## Content Sources Of Truth

When updating portfolio content, use these in order:

1. application code in `src/`, `public/`, and `index.html`
2. positioning and achievements in `README-PERSONAL.MD`
3. project evidence in `Proyectos-refactoring/`
4. roadmap and iteration docs in `docs/`

Do not invent project claims. Validate every project statement against the corresponding source project first.

## Release Process

The release workflow is documented in:

- [docs/release-workflow.md](docs/release-workflow.md)

Standard flow:
1. work in a short-lived branch
2. run `npm run verify`
3. open a PR
4. wait for CI to pass
5. validate the critical routes locally or in preview
6. merge to `main`

## Deployment

The site is configured for Vercel.

- frontend output comes from `dist/`
- `/api/contact` is served as a serverless function
- public CV and asset files are served from `public/`

## Notes

- `README-PERSONAL.MD` and `Proyectos-refactoring/` are reference sources, not the main app to edit by default.
- The live portfolio should remain usable at every stage.
- Prefer small, reviewable changes over broad redesign passes.
