# Vowora Decision Log

| Date | Decision | Rationale | Owner | Status |
| --- | --- | --- | --- | --- |
| 2026-11-09 | Vowora is a discovery and coordination marketplace, not a payment custody system in MVP. | Customers should pay vendors directly; the platform must never claim payment verification. | Product | Implemented |
| 2026-11-09 | FastAPI owns business rules, auth, authorization, subscriptions, plan entitlements, CRM, workflow transitions, audit events, and financial records. | Separation of concerns; backend is the single source of policy. | Engineering | Implemented |
| 2026-11-09 | PostgreSQL is the source of truth for transactional data; object storage holds files. | Clear data ownership; permissioned file access; easy backup and restore. | Engineering | Implemented |
| 2026-11-09 | n8n handles notifications, reminders, CRM actions, onboarding, expiry alerts, and plan templates. | Keeps automation out of the business-critical source of truth. | Engineering | Implemented |
| 2026-11-09 | React frontend uses a demo auth store and mocked API responses locally. | Unblocks local development without a backend. `VITE_API_CONNECTED=true` switches to real API calls. | Engineering | Implemented |
| 2026-11-09 | Black, white, and neutral gray as the only visual system. | Consistent brand direction; no feature-specific themes. | Design | Implemented |
| 2026-11-09 | Silver, Gold, and Diamond subscription plans; entitlements in PostgreSQL, not hardcoded. | Configurable limits; frontends read from the admin/api, never hardcode. | Product | Implemented |
| 2026-11-09 | Vendor and planner dashboards share 80–90% of layout and components. | Reduces duplication and keeps role-specific modules small. | Product | Implemented |
| 2026-11-09 | MVP does not include payment custody, live chat, or AI recommendation intelligence. | These are separate, approved scopes requiring governance and risk review. | Product | Blocked |
| 2026-11-09 | Demo credentials are used only for local development. | Prevents retail sign-in flow until real auth is in place. | Engineering | Implemented |
| 2026-11-09 | Trade, event, and marketing emails go through n8n; in-app records supplement them. | Tuning control; auditable delivery attempts; no platform dependency on marketing vendors. | Marketing | Proposed |
| 2026-11-09 | Object storage uses private-by-default buckets with signed URLs. | Protects invoices, identity files, and evidence from enumeration. | DevOps | Planned |
| 2026-11-09 | Search reads from a projection excluding private fields. | Keeps public discovery safe and fast. | Engineering | Planned |
| 2026-11-09 | Audit events are append-only; sensitive corrections create new records. | Preserves evidentiary history. | Security | Planned |
| 2026-11-09 | Quotes and approved proposals are immutable; corrections create versions. | Prevents silent edits to financial and legal commitments. | Legal | Planned |
| 2026-11-09 | Payment status is labeled reported, evidence-attached, or platform-recorded. | Transparent about what the platform actually knows. | Legal | Planned |
| 2026-11-09 | Plans and limits are configuration-driven, not hardcoded. | Enables pricing and entitlement changes in admin and database. | Engineering | Planned |

## Decisions awaiting input

- Exact OIDC/SAML provider and session storage backend.
- Object storage vendor and region.
- Whether customer-to-vendor invoicing should allow partial payments or installments.
- Whether admin impersonation is ever permitted (recommendation: no, use time-bound audited support access).
- Search provider for public discovery.
