# Vowora Event-Driven Architecture

## Principles

- FastAPI is the source of truth.
- n8n consumes events for notifications and automation.
- Events are asynchronous and idempotent.
- Public search reads from a projection that does not block production writes.

## Event categories

- Authorization events.
- Workflow events.
- Financial events.
- Notification events.
- Security events.

## Delivery

- Queue workers process events.
- Each event includes an idempotency key.
- Delivery attempts and final status are logged.

## Status

- **Planned** — event infrastructure is not yet implemented.
