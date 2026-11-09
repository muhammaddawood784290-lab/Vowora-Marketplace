# Vowora Booking Flow

## Overview

The booking flow describes how a customer finalizes a vendor or planner engagement after approving a proposal.

## Flow

1. Customer approves a proposal.
2. Booking is confirmed.
3. Customer receives booking details, amounts, and payment instructions.
4. Vendor or planner tracks the booking status.
5. Payment is made directly by the customer to the vendor or planner.
6. Vendor or planner records payment status and evidence.
7. Event progresses through in progress and completion.
8. After completion, the booking closes and is retained.

## Booking entity

- booking.id
- booking.eventId
- booking.vendorId
- booking.plannerId
- booking.totalAmount
- booking.currency
- booking.status: pending, confirmed, in_progress, completed, cancelled
- booking.startDate
- booking.endDate
- booking.createdAt
- booking.updatedAt

## Status transitions

| From | To | Trigger |
| --- | --- | --- |
| Pending | Confirmed | Customer approves proposal. |
| Confirmed | In progress | Event starts. |
| In progress | Completed | Event completes. |
| Any | Cancelled | Customer, vendor, or planner cancels. |

## Payment

- The platform does not hold or route event funds in MVP.
- Customer pays vendor or planner directly.
- Payment status is recorded as reported, evidence-attached, or platform-recorded.
- The platform never claims platform verification.

## Exceptions

- Booking can be cancelled only for defined reasons.
- If a vendor cancels, the customer is notified and a new vendor may be selected.
- Payment evidence is stored in object storage.

## Data retention

- Booking and payment status records are retained per the data retention policy.
- Invoices and evidence are stored in object storage.
