# Vowora Service Boundaries

## Role of FastAPI

FastAPI owns:

- Authentication and session management.
- Authorization and user roles.
- Subscription and plan entitlements.
- CRM access rules.
- Workflow transitions.
- Audit events.
- Financial record keeping.

## Role of React frontend

- Render UI.
- Collect input.
- Call the API.
- Store user session locally.
- Handle loading and error states.

## Role of n8n

- Notifications.
- Reminders.
- CRM actions.
- Onboarding.
- Expiry alerts.
- Plan-specific automation templates.

## Role of PostgreSQL

- Source of truth for transactional data.
- Users, profiles, events, quotes, proposals, bookings, invoices, subscriptions, plans, audit events.

## Role of object storage

- Portfolio images.
- Invoices.
- Identity documents.
- Payment evidence.
- Only metadata and paths are stored in PostgreSQL.

## Role of Redis

- Cache and queue support where required.

## Status

- **Planned** — clear boundaries.
- **Blocked** — backend delivery.
