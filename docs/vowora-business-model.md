# Vowora Business Model

## Business model

Vowora operates a global wedding and event marketplace owned and developed by Permetheon and Solvx.

## Revenue streams

| Stream | Description | MVP status |
| --- | --- | --- |
| Subscription plans | Vendors and planners pay monthly Silver, Gold, or Diamond. | Partially implemented. |
| Organizer fees | Organizers may charge a separate fee on consolidated proposals. | Partially implemented. |
| Integration/gateway fees | Future gateway integration could include transaction fees. | Blocked. |
| Premium tools | Analytics, automation templates, CRM, branding tiers. | Partially implemented. |

## Current monetization

- Subscription plans are the primary MVP revenue model.
- Plan limits and entitlements are stored in PostgreSQL and checked server-side.
- No payment custody or settlement is performed in MVP.

## Cost structure

- Infrastructure: managed hosting, managed database, object storage, CDN for public listing media.
- Operations: monitoring, logging, backups, and support.
- Compliance: legal review, privacy policies, and data protection measures.

## Unit economics

- Subscription plans provide predictable recurring revenue.
- Invoices and payment status records provide transparency for direct payments.
- Verification and moderation increase trust and reduce dispute costs.

## Pricing strategy

- Free customer accounts.
- Tiered vendor and planner subscriptions: Silver, Gold, Diamond.
- Plan limits and features are configurable.
- No hardcoded plan limits in application logic.

## Customer segments

- Customers planning weddings, engagements, birthdays, corporate events, and social gatherings.
- Vendors offering photography, florals, venues, catering, music, rentals, and specialists.
- Planners coordinating event briefs, shortlists, and proposals.

## Distribution

- Direct signup and login.
- Marketplace and category browsing.
- Search and recommendation.
- Marketing email and n8n workflows.

## Growth hypotheses

- Verified profiles increase conversion.
- Shortlists improve proposal outcomes.
- CRM and automation tools retain vendors and planners.
- Transparency in payment status reduces disputes.

## Metrics

- Active bookings.
- Conversion rate from brief to proposal.
- Vendor response time.
- Response vs. counteroffer rates.
- Plan upgrade rate.
- Notification delivery and open rates.

## Financial controls

- Append-only audit records for sensitive changes.
- Server-side plan entitlement checks.
- Immutable quote and proposal versions.
- Explicit payment evidence labels.
