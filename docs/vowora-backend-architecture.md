# Vowora Backend Architecture

## Architecture overview

The FastAPI backend is the system of record for business rules, authentication, authorization, subscriptions, plan entitlements, CRM access, workflow transitions, audit events, and financial records.

## Modules

- Users and roles.
- Customer profiles.
- Vendor profiles.
- Planner profiles.
- Events and organizer assignments.
- Shortlists and proposal sourcing.
- Vendor requests and quotes.
- Bookings and invoices.
- Subscriptions and plan entitlements.
- Admin configuration.
- Notifications and audit.

## Data flow

1. React frontend calls FastAPI `/api/v1` endpoints.
2. Auth middleware validates session or token.
3. Service layer enforces role and object-level authorization.
4. Repository layer persists to PostgreSQL.
5. Audit events are appended.
6. n8n is notified for non-critical follow-ups.

## Status

- **Planned** — no backend code is in this workspace.
- **Blocked** — Python backend delivery.

## Connectivity

- React calls the backend only.
- FastAPI is the single entry point for business logic.
- n8n is a consumer of backend events.
