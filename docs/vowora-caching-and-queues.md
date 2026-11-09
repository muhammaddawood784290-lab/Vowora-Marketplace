# Vowora Caching and Queues

## Caching

- Use Redis where required.
- Cache public marketplace data and common dashboard aggregates.
- Source-of-truth writes do not depend on cache availability.

## Queues

- Background jobs for notifications, reminders, CRM actions, and expiry alerts.
- Each job includes an idempotency key, retry strategy, and dead-letter handling.

## Status

- **Planned** — Redis and queue infrastructure are not yet implemented.
