# Vowora Invoice and Finance Specification

Invoices are records of direct customer-to-vendor or customer-to-planner obligations. MVP does not hold, route, settle, or verify event funds.

Each invoice stores issuer, payer, payee, source quote, amount, currency, status, due date, file reference, and audit history. Payment status must be labelled reported, evidence attached, or platform-recorded; never platform-verified unless a future gateway confirms it.

## Data model

- issuerId
- issuerName
- payerId
- payerName
- payeeId
- payeeName
- amount
- currency
- status
- paymentStatus
- dueDate
- fileReference
- createdAt

## Status

- **Implemented** — specification and invoice records.
- **Planned** — gateway and financial processing.
