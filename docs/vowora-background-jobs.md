# Vowora Background Jobs

## Job categories

- Notifications: assignment created, request received, quote submitted, proposal sent, proposal approved, invoice issued, payment status changed, subscription renewed, item expired.
- Reminders: subscription expiry, quote expiry, availability expiry.
- CRM and onboarding actions.

## Guarantees

- Idempotency keys for every job.
- Retry with backoff.
- Dead-letter queue for failures.
- Admin replay for processed jobs.
- Delivery attempt and final status logged.

## Status

- **Planned** — queue workers are not yet implemented.
