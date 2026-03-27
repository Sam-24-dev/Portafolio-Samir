# Samir Caizapasto Portfolio

Analyst-first portfolio built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

The site is a single bilingual experience focused on:

- recruiter clarity on first view
- measurable project proof for hiring managers
- optional technical depth through featured case studies

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Vitest + Testing Library
- Vercel serverless function for contact delivery

## Product Snapshot

Current portfolio behavior includes:

- bilingual English and Spanish content
- browser-language detection with persisted language selection
- theme toggle with persistence
- featured project hierarchy with case-study modals
- supporting project archive
- contact form backed by `/api/contact`
- social preview and favicon assets for sharing

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run tests:

```bash
npm run test
```

## Validation Commands

Run these before closing a meaningful change:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run test -- --run
```

## Environment Variables

The contact form posts to `api/contact.ts` and expects these variables in local or Vercel environments:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

Use `.env.local` for local development and keep `.env.example` as the public template.

## Project Structure

```text
src/
  components/   UI sections and shared UI pieces
  context/      language and theme providers
  data/         translations, project data, case studies
  test/         shared test setup
api/
  contact.ts    Vercel serverless contact endpoint
public/
  cv/           downloadable CV
  certificates/ downloadable certificates
  images/       profile, project screenshots, icons
docs/
  roadmap-v2.md
  iterations/
```

## Content Maintenance

Main places to update content:

- `src/data/translations.ts` for bilingual UI copy
- `src/data/projects.ts` for project cards and URLs
- `src/data/caseStudies.ts` for featured project modal content
- `public/images/projects/` for project screenshots
- `public/cv/SamirCaizapastoCV.pdf` for the downloadable CV
- `public/certificates/` for public certificate assets
- `index.html` and `public/` root assets for metadata, favicon, and social preview

Reference material for future content updates lives in:

- `README-PERSONAL.MD`
- `Proyectos-refactoring/`
- `docs/`

Do not invent project claims when updating portfolio content. Validate against the corresponding project source first.

## Deployment

The site is configured for Vercel.

- static frontend output comes from `dist/`
- `/api/contact` is served as a serverless function
- CV files are served as attachments through `vercel.json`

Deploy flow:

```bash
npm install
npm run build
```

Then deploy through Vercel or push to the connected repository branch.

## Notes

- `README-PERSONAL.MD` and `Proyectos-refactoring/` are reference sources, not the main app to edit by default.
- The live portfolio should remain usable at every stage.
- Prefer small, reviewable changes over large redesign passes.
