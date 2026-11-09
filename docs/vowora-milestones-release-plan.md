# Vowora Milestones and Release Plan

## Milestone M0 — Foundations

**Target:** Week 4

- Repository split into frontend, backend, automation, database migration, and documentation areas.
- React frontend running locally with mock data.
- FastAPI skeleton deployed locally.
- PostgreSQL schema and migration scripts.
- Authentication endpoints with OIDC compatibility.
- `docs/` index created.
- Demo credentials available for local development.

## Milestone M1 — MVP marketplace

**Target:** Week 12

- Customer event briefs, planner assignment, vendor shortlists, proposals, bookings, and invoice tracking.
- Vendor profile, packages, and public listing pages.
- Admin panels for plans, categories, verification, assignments, disputes, subscriptions, and audit review.
- Notification pipeline live.
- Role isolation tests passing.

## Milestone M2 — Business tooling

**Target:** Week 20

- CRM, portfolio, rates, availability, team members, branding, analytics, automation templates.
- Subscription plan upgrades and server-side entitlement checks.
- Search and discovery projections.
- Load and performance baselines established.

## Milestone M3 — Production readiness

**Target:** Week 28

- Monitoring, structured logs, alerting, and dashboards.
- Backup, restore, and disaster recovery runbooks.
- Security testing and penetration summary.
- Performance and browser compatibility baselines.
- Production deployment runbook.

## Release plan

| Release | Scope | Notes |
| --- | --- | --- |
| R0 | Foundations | Demos, mock data, skeleton, and docs. |
| R1 | MVP | Event, shortlist, proposal, booking, invoice workflows. |
| R2 | Business tools | CRM, analytics, automation, entitlements. |
| R3 | Scale & reliability | Observability, backups, security, performance. |
| R4 | Payment gateway | Separate approved scope; never MVP. |
| R5 | Chat & recommendation | Separate approved scope. |

## Cadence

- Sprint planning: weekly.
- Release candidate: monthly against the release milestones.
- Security and compliance review: before R3.
- User research: monthly in alpha, weekly in beta.

## Risks

| Risk | Mitigation |
| --- | --- |
| Backend scope creep | Hard scope MVP; defer gateway, chat, and AI. |
| Demo auth leaking to production | Replace with real auth; remove demos at production build. |
| Database drift | Migration-first workflow; no schema bypasses. |
| Team velocity | Shared shell for vendor and planner; 80–90% reuse target. |
| Third-party dependency delays | Keep adapter interfaces; swap providers without schema changes. |
