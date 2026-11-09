# Vowora Project Phases and Roadmap

## Phase 0: Foundations (Weeks 1–4)

Build the product and engineering skeleton.

- React frontend with role guardrails and mock data services.
- FastAPI backend skeleton with domain models.
- PostgreSQL schema files and migration tooling.
- Authentication with OIDC/SAML and a real user store.
- Organization-wide onboarding.
- Demo credentials to unblock local development.

**Deliverables:** frontend repo, backend skeleton, `docs/` index, database schema, API specification.

## Phase 1: MVP marketplace (Weeks 5–12)

Core marketplace and event coordination.

- Customer event briefs, planner assignment/selection, vendor shortlists, proposals, bookings, and invoice tracking.
- Vendor profile and package management.
- Role-based dashboards for customer, vendor, and planner.
- Admin configuration for plans, categories, verification, and audit review.

**Deliverables:** end-to-end event flow, invoice tracking, first admin panel views, notification pipeline.

## Phase 2: Business tooling (Weeks 13–20)

Vendor and planner business tools.

- CRM, portfolio, rates, availability, team members, branding, analytics, automation templates.
- Plan upgrade and entitlement checks in FastAPI.
- Assignment workflows and admin overrides.
- Search and discovery projections.

**Deliverables:** dashboard completeness for vendor and planner, analytics, CRM, and automation foundations.

## Phase 3: Reliability and scale (Weeks 21–28)

Observability, operations, and hardening.

- Monitoring, logs, alerting, and structured logs.
- Backups, restore drills, and disaster recovery.
- Queue processing, idempotency, retries, and dead-letter queues.
- Performance and load testing.

**Deliverables:** production-grade operations, backup restore runbook, security testing pass.

## Phase 4: Expansion (Weeks 29+)

- Payment gateway integration (separate approved scope).
- Live chat, recommendation intelligence, and multi-country support.
- Webhooks for third-party systems.

**Note:** Payment custody is never part of MVP. Gateway, chat, and recommendation modules are separate, explicitly approved scopes.

## Build-safeguards

- No hardcoded plan limits; entitlements live in PostgreSQL.
- No images or documents in PostgreSQL; metadata and paths only.
- Do not build live chat, recommendation intelligence, or gateway payments before their approved scope.
- Keep invoice and payment records informational until the payment phase is approved.
- Generate OpenAPI documentation from FastAPI.
- Add tests for role isolation, plan limits, private files, state transitions, and webhook idempotency.
