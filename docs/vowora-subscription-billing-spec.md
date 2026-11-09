# Vowora Subscription Billing Spec

## Plans

- Silver, Gold, Diamond.
- Entitlements are stored in PostgreSQL and checked server-side.

## Lifecycle

- Trial or pending → active → past due → grace period → suspended → cancelled.

## Plan changes

- Preserve audit history.
- Define immediate or next-cycle entitlement changes.

## Status

- **Partially implemented** — plan configuration exists.
- **Planned** — billing processing and gateway integration.
