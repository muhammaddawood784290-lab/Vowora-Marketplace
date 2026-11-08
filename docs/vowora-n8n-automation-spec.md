# Vowora n8n Automation Specification

n8n handles notifications, reminders, CRM actions, onboarding, expiry alerts, and approved plan templates. FastAPI remains the source of truth.

## Triggers

Event submitted, assignment created, request received, quote submitted, proposal sent, proposal approved, invoice issued, payment status changed, subscription renewed, and item expired.

## Plan templates

All plans have automation access. Silver, Gold, and Diamond receive different template libraries and limits. Workflows must be signed, authenticated, idempotent, logged, and retry-safe.
