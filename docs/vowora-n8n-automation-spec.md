# Vowora n8n Automation Spec

n8n handles notifications, reminders, CRM actions, onboarding, expiry alerts, and approved plan templates. FastAPI remains the source of truth.

## Triggers

- Event submitted.
- Assignment created.
- Request received.
- Quote submitted.
- Proposal sent.
- Proposal approved.
- Invoice issued.
- Payment status changed.
- Subscription renewed.
- Item expired.

## Plan templates

All plans have automation access. Silver, Gold, and Diamond receive different template libraries and limits. Workflows must be signed, authenticated, idempotent, logged, and retry-safe.

## Status

- **Partially implemented** — specification and plan templates exist.
- **Planned** — n8n workflows and integration.
