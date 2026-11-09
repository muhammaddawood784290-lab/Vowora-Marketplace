# Vowora Payment Gateway Spec

## Status

- Payment gateway integration is a later module.
- It is part of a separate, approved expansion scope.

## Requirements

- Idempotency.
- Webhook verification.
- Payment intent status.
- Refunds.
- Dispute states.
- Reconciliation.
- Secure tokenization.

## Constraints

- The backend must never store raw card data.
- Provider webhooks are verified, replay-safe, and mapped to internal payment records.
