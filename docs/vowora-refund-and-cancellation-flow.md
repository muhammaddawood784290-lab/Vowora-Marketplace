# Vowora Refund and Cancellation Flow

## Overview

The refund and cancellation flow controls how customers, vendors, and planners withdraw or reverse engagements and payments.

## Cancellation

### Customer cancellation

- Customer cancels an event before the vendor or planner accepts.
- Event status moves to cancelled.
- No charge is issued unless stated in the terms.

### Vendor cancellation

- Vendor withdraws a response or cancels a quote or proposal.
- The customer is notified.
- The organizer may select a replacement vendor or adjust the shortlist.

### Planner cancellation

- Planner withdraws from an assignment.
- Customer is notified.
- A new assignment may be arranged.

### Booking cancellation

- Booking can be cancelled only for defined reasons.
- If a vendor or planner cancels, the customer is entitled to a replacement or credit.

## Refunds

### MVP behavior

- Vowora does not process event refunds in MVP.
- Vendors and planners handle direct customer payment obligations under their published terms.

### Future gateway behavior

- Refund authority and authority limits.
- Cancellation windows.
- Payout timing.
- Failed payment handling.
- Dispute states.
- Tax treatment.
- Records retention.

## Exceptions

- Agreements may override plan defaults with a reason.
- Cancellations after the agreed window may take effect as agreed.
- Refunds are recorded as auditable corrections, never silent edits.

## Status transitions

| From | To | Trigger |
| --- | --- | --- |
| Booking pending | Cancelled | Customer cancels. |
| Booking confirmed | Cancelled | Vendor cancels. |
| Dispute open | Resolved | Evidence reviewed. |
| Dispute resolved | Closed | Final decision. |
| Invoice overdue | Paid | Payment received. |
| Invoice overdue | Refunded | Refund processed. |

## Data retention

- Cancellation and refund records are retained per the data retention policy.
- Evidence is stored in object storage.
