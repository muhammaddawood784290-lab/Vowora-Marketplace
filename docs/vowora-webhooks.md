# Vowora Webhooks

## Purpose

- Notify third-party systems of important events.
- Support integration with automation, analytics, and external tools.

## Events

- Assignment created.
- Request received.
- Quote submitted.
- Proposal sent.
- Proposal approved.
- Invoice issued.
- Payment status changed.
- Subscription renewed.
- Item expired.

## Standards

- Webhooks are signed.
- Webhook receivers must verify signatures.
- Idempotency is required for financial and status operations.
- Retry with backoff and dead-letter queue.
- Delivery attempts, provider response, retry count, and final status are logged.

## Status

- **Planned** — webhook infrastructure is not yet implemented.
