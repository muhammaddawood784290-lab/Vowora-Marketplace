# Vowora Payment Gateway Specification

Payment gateway integration is a later module. The gateway adapter must support idempotency, webhooks, payment intent status, refunds, dispute states, reconciliation, and secure tokenization.

The backend must never store raw card data. Provider webhooks are verified, replay-safe, and mapped to internal payment records.
