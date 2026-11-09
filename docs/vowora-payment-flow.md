# Vowora Payment Flow

## Overview

In MVP, Vowora is a discovery and coordination marketplace. Customers pay vendors and organizers directly. The platform preserves invoices and records payment status and evidence without claiming payment verification.

## Flow

1. Customer approves a proposal.
2. Customer receives booking details, amounts, and direct payment instructions.
3. Customer pays the vendor or planner directly.
4. Vendor or planner records payment status as reported.
5. If the platform has evidence, payment status is evidence-attached.
6. Platform-recorded status is used only when the platform explicitly records the payment.
7. Payment status and evidence are auditable.

## Payment status values

| Status | Meaning |
| --- | --- |
| Unpaid | Payment has not been recorded. |
| Reported | Vendor or planner self-reports payment. |
| Evidence attached | Evidence supplied by the provider. |
| Platform recorded | Platform explicitly records the payment. |
| Disputed | Payment or evidence is disputed. |
| Refunded | Payment refunded. |

## Invoice

- Invoice stores issuer, payer, payee, source quote, amount, currency, status, due date, file reference, and audit history.
- Invoice versions are preserved.

## Constraints

- No payment custody in MVP.
- No platform settlement.
- No platform verification claim.
- Gateway payment status is labeled evidence-attached or platform-recorded only when the provider confirms it.

## Exceptions

- If the gateway confirms a payment, the provider confirmation is evidence.
- If a provider self-reports payment, the record is reported.
- If the platform receives an explicit payment record, the record is platform_recorded.
