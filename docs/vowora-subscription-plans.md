# Vowora Subscription Plans

Plans are configurable in PostgreSQL and admin panel. Core marketplace participation is available to all paid plans.

## Vendor and Planner plans

| Capability | Silver | Gold | Diamond |
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

Vendor incoming lead/request limits are configurable per month. Diamond may be unlimited. Planner assigned events are 5/month for Silver, 15/month for Gold, and 35/month for Diamond.

## Plan lifecycle

- Trial or pending → active → past due → grace period → suspended → cancelled.
- Plan changes preserve audit history.
- Entitlements are checked server-side on every restricted action.
- Plan changes define immediate or next-cycle entitlement changes.

## Plan configuration

Administration pages allow configuration for:

- Pricing.
- Limits.
- Feature entitlements.
- Plan ordering.

## Entitlements

| Field | Type |
| --- | --- |
| plan | silver, gold, diamond |
| maxPortfolioImages | number or unlimited |
| maxPackages | number or unlimited |
| maxTeamMembers | number |
| maxAssignedEvents | number |
| maxIncomingRequests | number or unlimited |
| crmAccess | boolean |
| n8nAccess | boolean |
| n8nTemplateLevel | silver, gold, diamond |
| analyticsTier | basic, advanced, full |
| searchVisibility | normal, improved, priority |
| customBranding | basic, moderate, advanced |
| prioritySupport | boolean |

## Status

- Implemented (configuration model).
- Partially implemented (plan configuration pages exist).
