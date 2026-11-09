# Vowora Pricing and Commission Model

## Pricing model

Vowora uses a transparent, configuration-driven pricing model.

## Core principles

- Prices are stored in the database and updated through admin or API configuration.
- No price is hardcoded in application logic.
- Customers pay vendors and organizers directly.
- Invoices and payment status are recorded; the platform never claims payment verification.

## Subscription pricing

| Plan | Monthly price | Notes |
| --- | --- | --- |
| Silver | $49 | Essential plan for new vendors and planners. |
| Gold | $99 | Growth plan for established businesses. |
| Diamond | $199 | Premium plan for high-volume businesses. |

## Plan features

| Feature | Silver | Gold | Diamond |
| --- | --- | --- | --- |
| Portfolio images | 10 | 50 | Unlimited |
| Packages | 10 | 25 | Unlimited |
| CRM | Yes | Yes | Yes |
| Team members | 5 | 10 | 15 |
| Custom branding | Basic | Moderate | Advanced |
| n8n automation | Yes | Yes | Yes |
| n8n templates | Silver | Gold | Diamond |
| Analytics | Basic | Advanced | Full |
| Search visibility | Normal | Improved | Priority |
| Priority support | Same | Same | Same |

## Incoming request limits

Vendor incoming lead/request limits are configurable per month.

## Planner assigned event limits

| Plan | Assigned events per month |
| --- | --- |
| Silver | 5 |
| Gold | 15 |
| Diamond | 35 |

## Organizer fee

- Organizer fee is a separate line item or agreement on consolidated proposals.
- The organizer fee is disclosed in the proposal and tracked as a separate record.

## Commission model

- No marketplace commission in MVP.
- Future gateway integration may include a commission or transaction fee.
- Commission logic is not part of MVP and remains a separate approved scope.

## Pricing controls

- Plan limits and features are stored in PostgreSQL.
- Admins can configure pricing, limits, entitlements, and plan ordering.
- Entitlements are checked server-side.

## Changes and auditing

- Any pricing or plan configuration change is recorded with an audit record.
- Before/after values, actor, timestamp, and request ID are required for sensitive changes.

## Financial labels

- Payment status must be labeled `reported`, `evidence_attached`, or `platform_recorded`.
- The platform never claims platform verification of event funds in MVP.
