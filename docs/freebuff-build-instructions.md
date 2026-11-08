# Freebuff Build Instructions for Vowora

## Project identity

Build Vowora, a global wedding and event marketplace owned and developed by Permetheon and Solvx. The visual system is strictly black and white with neutral gray support tones.

## Locked technology decisions

- Frontend: React.js
- Backend: Python with FastAPI
- Database: PostgreSQL
- Automation: n8n through authenticated webhooks
- Storage: Supabase Storage or S3-compatible object storage
- Cache and queues: Redis when required

Do not replace FastAPI or PostgreSQL with Convex, Firebase, Supabase Edge Functions, Node.js, Laravel, or .NET. Supabase may provide hosted PostgreSQL, Auth, and Storage, but it is not the application backend.

## Architecture rules

React calls FastAPI only. FastAPI owns business rules, authentication, authorization, subscriptions, plan entitlements, CRM access, workflow transitions, audit events, and financial records. PostgreSQL is the source of truth. n8n performs notifications, reminders, CRM automations, and plan-specific templates; it must not become the source of truth.

## Product roles

Implement Customer, Vendor, Planner, and Admin roles with backend object-level authorization. Vendor and Planner dashboards should share approximately 80–90% of the layout and components, while Customer has a separate marketplace and event view.

## Subscription entitlements

Support Silver, Gold, and Diamond plans. CRM is available on all plans. Package limits are 10, 25, and unlimited. Vendor incoming lead/request limits are configurable per month. Planner assigned events are 5, 15, and 35 per month. Team members are 5, 10, and 15. n8n is available on all plans with plan-specific template libraries. Custom branding is Basic, Moderate, and Advanced. Priority support is the same across all plans.

## Build safeguards

- Do not hard-code plan limits; store entitlements in PostgreSQL.
- Do not store images or documents in PostgreSQL; store metadata and object paths only.
- Do not build live chat, recommendation intelligence, or gateway payments before their approved scope.
- Keep invoice and payment records informational until the payment phase is approved.
- Generate OpenAPI documentation from FastAPI.
- Add tests for role isolation, plan limits, private files, state transitions, and webhook idempotency.

## Required output

Create a maintainable repository with separate frontend, backend, automation, database migration, and documentation areas. Include environment examples, seed data, API documentation, migration scripts, test commands, and a deployment README. Preserve the existing Vowora documents and black-and-white design direction.
