# Vowora Master Plan

## Objective

Build and operate Vowora, a global wedding and event marketplace owned and developed by Permetheon and Solvx. The MVP deliberately avoids marketplace payment custody: customers pay vendors and organizers directly, while the platform preserves invoices and records payment status and evidence without claiming payment verification.

## Guiding principles

- Black, white, and neutral gray only for the visual system.
- The platform is a discovery and coordination tool, not a payment custody system in MVP.
- FastAPI owns all business rules, authentication, authorization, subscriptions, plan entitlements, CRM access, workflow transitions, audit events, and financial records.
- PostgreSQL is the source of truth.
- n8n performs notifications, reminders, CRM automations, and plan-specific templates; it must not become the source of truth.
- Data ownership is clear: PostgreSQL holds transactional records; object storage holds files.
- World-class search and recommendations are avoided until analytics are proven, or use explainable, admin-overridable rules.

## Current state

This documentation system is the "as-is" skeleton. The repository contains:

- A React frontend with TypeScript, React Router, and mock data services.
- 25 existing documentation files, most short.
- Two corrupted documentation files that are OOXML (ZIP) artifacts rather than Markdown.
- No backend code committed to this workspace.

## Status

- **Product requirements**: Partially implemented — the PRD exists as an OOXML artifact and must be recovered or regenerated as Markdown.
- **Technical architecture**: Partially implemented — FastAPI and PostgreSQL plans are defined but no backend code exists in this workspace.
- **Frontend**: Partially implemented — the React app is running locally with mock data; auth is a demo store; API calls return mock data unless `VITE_API_CONNECTED=true`.
- **Deployment**: Blocked — no deployment scripts, manifests, or production configuration exist yet.
- **Security and compliance**: Planned — roles, permissions, threat model, and compliance documents are created in this system.

## Next steps

1. Recover the product requirements from the corrupted file or regenerate them as Markdown.
2. Define the backend API contract and service boundaries.
3. Implement the FastAPI backend with PostgreSQL.
4. Connect the frontend to the backend through `VITE_API_CONNECTED=true`.
5. Add staging and production deployment configurations.

## Time horizon

- MVP: 9–12 months for a single coordinated team.
- Market sequence: US → EU → Gulf → other countries.

## Major risks

| Risk | Mitigation |
| --- | --- |
| Payment custody scope creep | Keep MVP informational; defer gateway integration. |
| Demo auth in production | Replace with OIDC/SAML; never ship demo credentials. |
| Object storage misconfiguration | Private-by-default; signed URLs; no public keys in frontend. |
| Audit gaps | Append-only audit records for sensitive changes. |
| Recommendation risk | Start with explainable rules and admin overrides. |
