# Vowora Priorities and Backlog

## Priority P0 — MVP

1. React frontend with role guardrails and mock data.
2. FastAPI backend skeleton and PostgreSQL schema.
3. Customer event briefs and planner assignment.
4. Vendor shortlists and proposals.
5. Booking tracking and invoice records.
6. Admin configuration for plans, categories, and audit review.
7. Notification pipeline.
8. Role isolation and object-level authorization tests.

## Priority P1 — Business tooling

1. CRM, portfolio, rates, availability, team members, branding, analytics.
2. Subscription plan upgrades with server-side entitlement checks.
3. Search and discovery projections.
4. Assignment workflows with admin overrides.
5. Performance and load baselines.

## Priority P2 — Reliability

1. Monitoring, structured logs, and alerting.
2. Backups, restore drills, and disaster recovery.
3. Queue processing, idempotency, retries, and dead-letter handling.
4. Security testing and penetration summary.
5. Browser compatibility and accessibility baseline.

## Priority P3 — Expansion

1. Payment gateway adapter (separate approved scope).
2. Live chat (separate approved scope).
3. Recommendation engine (separate approved scope).
4. Multi-country support.

## Epics

### Authentication and identity

- OIDC/SAML login and logout.
- Session and token rotation.
- Role and permission enforcement.

### Marketplace and discovery

- Public and authenticated marketplace views.
- Search, categories, and featured listings.
- Shortlists and proposals.

### Vendor and planner tools

- Profile, packages, services, rates, availability, portfolio, analytics, CRM, automation, branding.

### Payments and finance

- Invoice records, payment status, and evidence metadata.
- Subscription billing and plan entitlements.
- Gateway adapter (future).

### Moderation and trust

- Verification, disputes, moderation tools, and audit review.

### Operations

- Deployment, monitoring, logging, backups, scaling, incident response.

## Backlog items

- [ ] FastAPI backend endpoints for all entities.
- [ ] PostgreSQL migrations and seed data.
- [ ] Frontend API service wired to the backend.
- [ ] Role isolation and object-level authorization tests.
- [ ] Plan entitlement checks.
- [ ] Notification, reminder, and expiry jobs.
- [ ] Webhook signing and idempotency.
- [ ] Admin audit playback.
- [ ] Monitoring and alerting.
- [ ] Backup and restore drills.

## Out of scope (MVP)

- Payment custody or settlement.
- Live chat.
- AI or ML recommendation intelligence.
- Multi-vendor payments in one transaction.
- Real-time chat media streaming.

## Decisions

- **Payment:** Platform stores invoices and evidence metadata only; no event funds are held, routed, settled, or verified in MVP.
- **Database:** PostgreSQL as the source of truth; object storage for files.
- **Automation:** n8n for notifications and CRM actions; FastAPI remains the source of truth.
- **Search:** Projection-based public discovery; source of truth writes do not depend on search availability.
- **Architecture:** Modular monolith for MVP; service extraction later when scale or team boundaries justify it.
