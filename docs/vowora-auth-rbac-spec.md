# Vowora Authentication and Permissions

Roles are Customer, Vendor, Planner, and Admin. Authorization is enforced in the backend service layer and tested independently of the UI.

## Access summary

- Customer: own profile, events, shortlists, proposals, invoices, and payment status.
- Vendor: own profile, packages, availability, incoming requests, quotes, invoices, and CRM.
- Planner: own profile, assigned events, vendor coordination, proposals, invoices, and CRM.
- Admin: configuration, verification, assignments, subscriptions, disputes, and audit review.

Object-level access is required for every event, request, quote, proposal, invoice, file, and CRM record.
