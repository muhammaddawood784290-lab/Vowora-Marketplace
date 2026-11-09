# Vowora Authentication and RBAC Spec

## Roles

- `customer`
- `vendor`
- `planner`
- `admin`

## Current frontend implementation

The frontend implements a demo auth store:

- `authService.login`, `authService.logout`, `authService.hasRole`, and role helpers.
- `useAuth` provides context.
- `App.tsx` enforces route redirects.
- Demo users: `customer@vowora.com`, `vendor@vowora.com`, `planner@vowora.com`, `admin@vowora.com` with password `demo123`.

## Access summary

- Customer: own profile, events, shortlists, proposals, invoices, and payment status.
- Vendor: own profile, packages, availability, incoming requests, quotes, invoices, and CRM.
- Planner: own profile, assigned events, vendor coordination, proposals, invoices, and CRM.
- Admin: configuration, verification, assignments, subscriptions, disputes, and audit review.

## Enforcement

- UI route guards are not the only enforcement point.
- Authorization is enforced in the backend service layer.
- Object-level access is required for every event, request, quote, proposal, invoice, file, and CRM record.

## Status

- **Partially implemented** — demo auth and UI guards; real auth is blocked.
- **Planned** — full RBAC specification in the backend.
