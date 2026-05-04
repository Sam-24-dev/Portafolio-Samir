# Handoff Snapshot — 2026-05-01 (post-launch-improvements)

## Context

- Branch: `post-launch-improvements`
- Purpose: post-launch polish, certifications split, hero/stack motion tuning, CI test stability, and agent handoff improvements.
- Commit reference: use `git log -1 --oneline` to see the current snapshot commit.

## Review status

- Local review: user confirmed the app looks good locally on 2026-05-01.
- Validation: run `npm run verify` before merge (not recorded in this snapshot).

## Files touched in this branch

### Modified

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
- `vitest.config.ts`

### New

- `.cursorrules`
- `docs/handoff/2026-05-01-post-launch-improvements.md`
- `src/components/CertificationGroups.tsx`
- `src/components/EngineeringCertifications.test.tsx`
- `src/components/EngineeringCertifications.tsx`
- `src/data/profileCertifications.ts`
- `src/hooks/useHeroMotionPolicy.ts`
- `src/hooks/useHeroTitleRotation.test.ts`
- `src/hooks/useHeroTitleRotation.ts`

## Environment notes

- Windows line-ending warnings (LF → CRLF) may appear for multiple files. Avoid unintended formatting churn.
- CI note: Vitest concurrency is capped in `vitest.config.ts` when `CI=true` to avoid OOM on GitHub Actions runners.

## Next steps (PR)

- Run `npm run verify` before merge.
- Merge only after PR checks and manual review pass.
