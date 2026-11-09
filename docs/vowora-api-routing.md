# Vowora API Routing

## API prefix

FastAPI exposes versioned JSON APIs under `/api/v1`.

## Areas

- `/auth`
- `/users`
- `/marketplace`
- `/events`
- `/assignments`
- `/shortlists`
- `/vendor-requests`
- `/quotes`
- `/proposals`
- `/bookings`
- `/invoices`
- `/subscriptions`
- `/notifications`
- `/files`
- `/admin`

## Standards

- OpenAPI generated from FastAPI.
- JWT or secure HTTP-only session cookies.
- Every write returns an object ID, status, and audit reference.
- Idempotency keys for webhooks and financial operations.
- `401` for unauthenticated and `403` for unauthorized requests.
- Never expose private event, invoice, identity, or payment evidence data in public endpoints.
