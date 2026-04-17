# Release Workflow

## Purpose

This workflow defines how to ship portfolio changes with the same quality gates locally and in GitHub.

## Standard Flow

1. Create a short-lived branch from the latest `main`.
2. Implement the change in small, reviewable commits.
3. Run `npm run verify` locally before opening a PR.
4. Open the PR with the standard template and summarize:
   - what changed
   - risk areas
   - validation already executed
5. Wait for `Quality` CI to pass.
6. Validate the preview or local build on the critical routes.
7. Merge to `main` only after CI and manual QA are both green.

## Local Validation Command

```bash
npm run verify
```

This command must cover:
- public assets
- content and metadata integrity
- lint
- typecheck
- tests
- production build

## Manual QA Checklist

Validate these before merge:

- routes:
  - `/`
  - `/engineering`
  - `/engineering/how-i-work`
  - `/engineering/strengths`
- modes:
  - light
  - dark
- languages:
  - EN
  - ES
- breakpoints:
  - `375`
  - `768`
  - `1024`
  - `1440`

Critical scenarios:
- profile switch works in desktop and mobile navigation
- language switch updates visible copy and metadata
- theme switch works in desktop and mobile without breaking the UI
- analyst and engineering case modals open and close correctly
- contact form success and error states still render correctly
- no horizontal scroll appears on mobile
- active nav state remains visible in both themes

## Release Notes Expectations

Every PR should make clear:
- user-facing change
- whether routing, metadata, forms, or shared shell were touched
- what was validated manually
- any residual warning or non-blocking risk
