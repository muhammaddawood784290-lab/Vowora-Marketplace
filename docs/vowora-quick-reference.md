# Vowora Quick Reference

## Roles

- Customer — plans events, browses vendors, shortlists, approves proposals, tracks bookings and invoices.
- Vendor — lists services, packages, rates, availability; responds to requests; submits quotes; issues invoices.
- Planner — coordinates events, builds shortlists, compares quotes, creates proposals, tracks bookings.
- Admin — configures plans, verifies users, manages categories, assignments, disputes, subscriptions, audit review, support.

## Routes

| Route | Access |
| --- | --- |
| `/` | Public landing page |
| `/marketplace` | Public marketplace browse |
| `/marketplace/category/:slug` | Public category browse |
| `/login` | Public login |
| `/signup` | Public signup |
| `/dashboard/*` | Customer, vendor, planner, admin (admin uses `/admin/*`) |
| `/admin/*` | Admin only |

## Demo credentials

| Role | Email | Password |
| --- | --- | --- |
| Customer | `customer@vowora.com` | `demo123` |
| Vendor | `vendor@vowora.com` | `demo123` |
| Planner | `planner@vowora.com` | `demo123` |
| Admin | `admin@vowora.com` | `demo123` |

## Subscription plans

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

## Path structure

```text
docs/                    Documentation system
vowora-frontend/         React frontend
  src/
    components/common/   Reusable UI components
    components/layout/   Shells, sidebars, top nav
    hooks/               Auth context and hooks
    pages/               Role-specific pages
    services/            Auth service and API client
    types/               TypeScript types
    utils/               Formatting utilities
```

## Key files

- `vowora-frontend/src/services/auth.ts` — demo user store and auth helpers for local development.
- `vowora-frontend/src/services/api.ts` — API client with mock data fallback for local development.
- `vowora-frontend/src/hooks/useAuth.tsx` — React auth context.
- `vowora-frontend/src/App.tsx` — routing rules and role-based redirects.
- `vowora-frontend/src/types/index.ts` — domain types: `User`, `Role`, `SubscriptionPlan`, `EventStatus`, and more.

## Supported commands

- `npm run dev` — start the Vite dev server.
- `npm run build` — type-check and production build.
- `npm run lint` — lint with oxlint.

## Deployment note

Prototype deployment (local dev, preview, staging) is a fast, non-production path. Production deployment requires managed hosting, managed database backups, object storage with private-by-default access, a CDN for public listing media, and a production-grade secret store. Production is a separate, later step.
