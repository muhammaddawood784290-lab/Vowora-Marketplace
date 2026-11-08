# Vowora API Specification

FastAPI exposes versioned JSON APIs under `/api/v1`. React and n8n access the API through authenticated HTTPS requests.

## Areas

`/auth`, `/users`, `/marketplace`, `/events`, `/assignments`, `/shortlists`, `/vendor-requests`, `/quotes`, `/proposals`, `/bookings`, `/invoices`, `/subscriptions`, `/notifications`, `/files`, `/admin`.

## Standards

- OpenAPI is generated from FastAPI.
- Use JWT or secure HTTP-only session cookies.
- Every write returns an object ID, status, and audit reference.
- Use idempotency keys for webhooks and financial operations.
- Return `401` for unauthenticated and `403` for unauthorized requests.
- Never expose private event, invoice, identity, or payment evidence data in public endpoints.
