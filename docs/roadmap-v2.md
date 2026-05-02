# Portfolio V2 Roadmap

## Document Purpose

This roadmap defines the staged evolution of the portfolio from the current V1 into a premium V2.

It is optimized for:
- incremental shipping
- `Data Analyst` first positioning
- future `Data Engineer` expansion
- minimal production risk

## Strategic Summarys

Portfolio V2 will remain one website, but it will evolve in phases.

Phase order:
1. strengthen the current site as an `Analyst-first` portfolio
2. deepen project storytelling and proof
3. improve conversion, trust, and production quality
4. activate the `Engineering` route without replacing the analyst-facing core
5. add quality automation and operational polish

## Audience Model

The portfolio must work for:
- recruiters and HR
- hiring managers
- technical reviewers
- collaborators or clients
- national, remote, and international opportunities

The site must therefore communicate in layers:
- quick clarity in the first screen
- measurable impact in the next sections
- optional technical depth on demand

## Current State Audit

### What already works

- Vite + React + TypeScript + Tailwind base is stable
- section-based one-page flow is clean
- theme toggle works and persists
- bilingual system works
- project cards and contact form already exist
- design foundation is good enough to iterate instead of rebuilding from zero

### Main gaps to fix

- current message is still too broad and undersells the updated analyst profile
- all projects currently receive similar visual weight
- contact form is not production-grade
- language does not auto-detect or persist
- social sharing and favicon setup are incomplete
- some docs and metadata are outdated
- there is no agent-ready operating documentation at repo root

## Positioning Decision

### Primary public route

`Data Analyst`

### Secondary future route

`Data Engineer`

### Why

- Analyst is the near-term hiring priority
- Analyst-first reduces confusion for recruiters
- Engineering evidence still strengthens credibility
- The current project set can already support both, but not with equal homepage weight yet

## Content Model For V2

### Tier 1: Featured analyst-facing projects

These should receive the strongest visual and narrative emphasis first:
- Customer Profile Analytics Dashboard
- eSports Analytics Dashboard LATAM
- Grocery Sales BI Dashboard

### Tier 2: Bridge projects

These support analytical rigor and technical breadth:
- Rice Crop Analytics Platform
- Statistical Analysis: Ping Pong Precision Model
- NASA Space Apps project

### Tier 3: Future engineering anchors

These should become the backbone of the future engineering route:
- Technology Trend Analysis Platform
- RideFare ETL Pipeline

## Product Experience Direction

### Experience principles

- one portfolio
- not all information at once
- premium but readable
- mobile-first
- analyst-first now
- engineering-ready later

### UX implications

- homepage must become more selective
- first screen must sell role, impact, and trust fast
- featured work must be curated instead of flat
- deeper project detail should move into case-study views or expanded sections

## Design Direction

Recommended aesthetic direction:
- editorial technical
- premium dark foundation with clearer light mode support
- fewer decorative effects, stronger hierarchy

Keep:
- current dark visual DNA
- cyan accent family if refined carefully
- section-based storytelling

Improve:
- typography hierarchy
- spacing rhythm
- project emphasis
- mobile density
- trust and proof surfaces

Avoid:
- overly glassy effects
- noisy liquid effects
- dashboard-like clutter on the homepage
- trying to show both analyst and engineer equally on first paint

## Prioritized Workstreams

### Workstream A: Positioning And Messaging

Goals:
- make the homepage clearly analyst-first
- integrate new achievements from `README-PERSONAL.MD`
- simplify first-impression reading for recruiters

Tasks:
- rewrite hero role and subtitle
- rewrite about section around outcomes and strengths
- introduce a short proof strip with metrics
- reduce generic skill listing in favor of value-driven messaging

Priority:
- critical

### Workstream B: Featured Projects And Case Studies

Goals:
- stop treating every project the same
- lead with the most recruiter-relevant analyst work
- create a stronger proof story

Tasks:
- split projects into `featured` and `supporting`
- add filters or grouping only after hierarchy is fixed
- create case-study depth for 1 to 2 featured projects
- keep NASA as supporting proof, not as a dominant lead project

Priority:
- critical

### Workstream C: Conversion And Trust

Goals:
- make it easy and professional to contact Samir
- improve visible trust signals

Tasks:
- replace `mailto` form with a real form service
- create a proper Open Graph image
- add a real favicon / brand asset
- keep CV access clear and stable
- expose certifications and awards more cleanly

Priority:
- critical

### Workstream D: UX And Responsive Quality

Goals:
- keep the site light, premium, and readable across devices

Tasks:
- improve mobile hero density
- increase touch target quality
- test tablet layouts explicitly
- prevent motion overload
- add reduced-motion support where needed

Priority:
- high

### Workstream E: Production Hygiene

Goals:
- remove friction for future agents and future iterations

Tasks:
- fix broken metadata references
- clean outdated docs
- remove unused dependencies
- compress oversized assets
- standardize project references and links

Priority:
- high

### Workstream F: Future Engineering Route

Goals:
- prepare for the second experience without disrupting the analyst-first release

Tasks:
- keep architecture ready for a second route
- define future engineering project ordering
- decide how to expose the second route later

Priority:
- medium for now

### Workstream G: Ops And Automation

Goals:
- improve confidence and maintainability once the portfolio gains more logic

Tasks:
- add tests around UI logic if complexity grows
- add CI checks
- add analytics for conversion behavior

Priority:
- later

## Phase Plan

## Phase 1: Analyst Foundation

Outcome:
- a stronger, clearer, still-light portfolio release

Scope:
- hero rewrite
- about rewrite
- proof strip
- featured projects ordering
- real contact form
- auto language + persistence
- mobile polish
- favicon + OG image

Must not do:
- full dual-route experience
- heavy modals everywhere
- large engineering content blocks on the homepage

Release condition:
- recruiters can identify role, value, and best projects within one minute

## Phase 2: Analyst Depth

Outcome:
- premium project storytelling without homepage overload

Scope:
- 1 to 2 case studies
- certification / awards section refinement
- better project navigation
- optional project filtering
- stronger project evidence from updated repos

Release condition:
- portfolio has clear depth for hiring managers, not just surface polish

## Phase 3: Conversion And Quality

Outcome:
- cleaner, more trustworthy production behavior

Scope:
- metadata cleanup
- image and PDF optimization
- analytics events
- doc cleanup
- dependency cleanup
- accessibility pass

Release condition:
- site is polished enough to share widely without obvious rough edges

## Phase 4: Engineering Route Activation

Outcome:
- second experience added without breaking the analyst-first message

Scope:
- expose `Engineering` as a secondary route, tab, or context switch
- feature Tech Trends and RideFare
- reuse shared components where possible

Release condition:
- visitors can choose depth without confusion

## Phase 5: Ops And Automation

Outcome:
- safer iteration velocity

Scope:
- CI checks
- test coverage where justified
- more robust quality gates

Release condition:
- future iterations are faster and lower risk

## Priority Backlog

### Do now

- Analyst-first messaging refresh
- real contact form
- featured projects hierarchy
- proof strip / impact metrics
- language persistence and auto-detection
- favicon and OG image
- responsive cleanup

### Do next

- case studies
- certifications and awards refinement
- project filtering
- supporting-project archive treatment
- asset optimization

### Do later

- engineering route
- embeds where they truly improve UX
- CI and tests for new interactive logic
- advanced analytics and automation

## Improvement Review Of The Original 16 Suggestions

### Promote to earlier priority

- real contact form
- SEO basics
- automatic language detection
- filtering
- social sharing
- image optimization

### Keep, but move later

- embeds
- architecture diagrams on the portfolio itself
- analytics
- unit tests
- CI/CD

### Reframe

- navbar UX already has a working base, so refine instead of rebuild
- lazy loading exists partially, so improve only where needed

## Additional Recommendations Beyond The Original 16

- create a proof strip below the hero
- split projects into featured and supporting
- keep a recruiter quick-read zone
- create a credentials hub section
- define source-of-truth rules for future agents
- keep `Proyectos-refactoring/` as reference evidence
- design the future engineering route now, but do not expose it fully yet

## Risks

- trying to show analyst and engineer equally too early
- adding too much detail to the homepage
- adding heavy visual effects that hurt mobile UX
- adding many features before fixing core trust and clarity
- turning the homepage into a dashboard instead of a portfolio

## Decision Log

- One portfolio, not multiple sites
- Analyst-first public experience
- Engineering route later on the same foundation
- Incremental rollout only
- Reference projects should drive claims and case studies
- NASA remains valid but should not dominate the V2 story

## Success Criteria

The roadmap is working if:
- Phase 1 ships without breaking the current site
- the first impression clearly says `Data Analyst`
- featured projects are stronger than the current flat list
- contact and trust signals feel professional
- future agents can continue work from docs without re-discovering strategy
