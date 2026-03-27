# Portfolio Maintenance Guide

This guide covers the real update points for the current portfolio. It is meant for maintenance, not for turning the repo into a generic template.

## 1. Install and Run

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the built site:

```bash
npm run preview
```

## 2. Configure Contact Delivery

The contact form sends requests to `api/contact.ts`.

Create `.env.local` with:

```bash
RESEND_API_KEY=re_your_resend_api_key
CONTACT_TO_EMAIL=your.email@example.com
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

If these values are missing, the UI will stay functional but the contact endpoint will return a configuration error.

## 3. Update the CV

Keep the downloadable CV at:

```text
public/cv/SamirCaizapastoCV.pdf
```

The current download links already point to that exact filename.

## 4. Update Project Images

Project screenshots live in:

```text
public/images/projects/
```

Current project image filenames include:

- `customer-profile-analytics.png`
- `esports-dashboard.png`
- `powerbi-dashboard.png`
- `rice-system.png`
- `pingpong-analysis.png`
- `nasa-space-apps.png`

Maintenance rules:

- keep the same filename when replacing an existing screenshot
- prefer PNG for dashboard-heavy screenshots
- compress before shipping when possible
- verify the image still looks clean inside the UI after replacement

## 5. Update Public Certificates

Public certificates live in:

```text
public/certificates/
```

Example:

- `public/certificates/nasa-space-apps-2025.pdf`

If a certificate is linked from project data or translations, keep the same public path unless you also update the references.

## 6. Update Portfolio Content

Use these files as the main editing surface:

- `src/data/translations.ts`
  - hero copy
  - section headings
  - bilingual text
  - public links stored in translation data
- `src/data/projects.ts`
  - project cards
  - badges
  - highlights
  - project URLs
- `src/data/caseStudies.ts`
  - featured project modal content
  - metrics
  - ownership framing
  - supporting case details

Do not edit `Proyectos-refactoring/` unless the task explicitly targets the reference projects themselves.

## 7. Update Metadata and Brand Assets

Current public metadata is managed in:

```text
index.html
```

Brand and sharing assets live at the root of `public/`:

- `public/favicon.svg`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png`
- `public/og-image.svg`
- `public/og-image.jpg`

When updating these:

- keep the canonical URL aligned with the current production domain
- keep Open Graph and Twitter images in sync
- verify the site preview still looks intentional when shared

## 8. Validation Checklist

Before finishing a portfolio update:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run test -- --run
```

Then verify manually:

- desktop layout
- mobile layout
- no horizontal scroll on mobile
- navigation works
- theme toggle works
- language toggle works
- CV download works
- certificate links open
- project screenshots still render clearly
- contact form still behaves correctly

## 9. Deployment Notes

This repo is configured for Vercel through `vercel.json`.

Important behavior already in place:

- frontend routes rewrite to `index.html`
- `/api/contact` stays server-side
- `/cv/*` is served with attachment headers

Before deployment:

- confirm environment variables are configured in Vercel
- run the validation checklist locally
- verify metadata and asset paths are correct for the target domain
