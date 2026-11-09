# Vowora Vendor Flow

## Overview

The vendor flow describes how a service professional lists capabilities, receives requests, submits quotes, and manages their business on Vowora.

## Flow steps

### 1. Profile creation

- Create a business profile with company name, tagline, description, category, and service area.
- Add services, packages, rates, portfolio, and availability.

### 2. Listing publication

- Services are published and searchable.
- Package limits are enforced by entitlement.
- Pricing is public starting or fixed price.

### 3. Receive events

- Vendor receives incoming requests from customers.
- Each request includes event context and requested services.

### 4. Respond

- Accept, reject, or counteroffer.
- Response updates the request status and audit trail.

### 5. Quote submission

- Vendor submits a quote with validity, taxes, fees, payment schedule, and cancellation terms.
- Quote versions are immutable.

### 6. Invoice issuance

- Vendor issues or uploads an invoice.
- Invoice versions are preserved.
- Payment status is recorded as reported, evidence-attached, or platform-recorded.

### 7. Payment status update

- After direct payment, the vendor updates status and attaches evidence.
- Evidence is stored in object storage.
- No platform payment verification is claimed.

### 8. Business operations

- View incoming requests, quotes, invoices, and analytics.
- Manage team members, branding, and automation templates.

## Exceptions

- Vendor can withdraw a response only for defined reasons.
- Quote version corrections create a new version.
- Invoice status changes are auditable.

## Status transitions

| From | To | Trigger |
| --- | --- | --- |
| Draft | Active | Profile completed. |
| Inactive | Active | Reopened by admin. |
| Request pending | Accepted | Vendor accepts. |
| Request pending | Rejected | Vendor rejects. |
| Request pending | Countered | Vendor counters. |
| Quote draft | Submitted | Vendor submits. |
| Quote submitted | Accepted | Customer accepts. |
| Invoice issued | Paid | Payment recorded. |
| Invoice issued | Overdue | Payment not recorded. |

## Constraints

- Package limits are enforced on the vendor plan.
- Team member and CRM limits are plan-based.
- Private event details are never exposed to unrelated providers.

## Security

- Vendor access is scoped to own events, requests, quotes, invoices, and CRM.
- Object storage is private; signed URLs are used for private files.
- Sensitive changes are audit-recorded.
