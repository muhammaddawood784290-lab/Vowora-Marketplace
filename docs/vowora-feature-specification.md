# Vowora Feature Specification

## Feature inventory

| Feature | Priority | Status | Notes |
| --- | --- | --- | --- |
| Customer event briefs | P0 | Partially implemented | Draft, submit, assign planner, track status. |
| Planner assignment | P0 | Partially implemented | Manual or automatic. |
| Vendor shortlists | P0 | Partially implemented | Customer selects or suggests vendors. |
| Vendor requests | P0 | Partially implemented | Accept, reject, counteroffer. |
| Vendor quotes | P0 | Partially implemented | Versioned, immutable. |
| Consolidated proposals | P0 | Partially implemented | Includes organizer fee. |
| Booking tracking | P0 | Partially implemented | Status and payment instructions. |
| Invoice tracking | P0 | Partially implemented | Payment status and evidence. |
| Vendor business tools | P1 | Partially implemented | Services, packages, rates, availability. |
| Planner coordination tools | P1 | Partially implemented | CRM, portfolio, analytics. |
| Admin configuration | P1 | Partially implemented | Plans, categories, verification, assignments, disputes, subscriptions. |
| Notification pipeline | P1 | Partially implemented | In-app, email, n8n. |
| CRM | P1 | Partially implemented | Vendor and planner scoped. |
| Analytics | P1 | Partially implemented | Revenue, bookings, ratings, conversions. |
| Automation templates | P1 | Partially implemented | Plan-specific templates via n8n. |
| Live chat | P2 | Blocked | Separate approved scope. |
| Payment gateway | P2 | Blocked | Separate approved scope. |
| Recommendation engine | P2 | Blocked | Separate approved scope. |

## Feature details

### 1. Customer event briefs

- Event type, date, timezone, location, guest count, budget, required categories, notes, attachments.
- Public visibility for marketplace discovery after brief is submitted.
- Planner assignment: customer suggestion, manual assignment, or automatic assignment per configured rules.
- Event status transitions are auditable.

### 2. Planner assignment

- Customer selects a planner or requests platform assignment.
- Manual assignment records the actor, time, and reason.
- Automatic assignment follows configurable rules and creates an audit record.
- Both paths produce the same assignment record shape.

### 3. Vendor shortlists

- Customer can suggest vendors or shortlist without selecting them.
- Organizer can add, replace, or remove vendors with a reason.
- Final vendor set cannot be booked until customer approves the proposal.

### 4. Vendor requests

- Organizer sends event-specific requests to vendors.
- Request includes event context and requested services.
- Vendors can accept, reject, or counteroffer.

### 5. Vendor quotes

- Quote versions are immutable.
- Each version retains items, subtotal, tax, total, validity, and status.
- Version history is retrievable.

### 6. Consolidated proposals

- Proposal references source quote versions.
- Organizer fee is a separate line item or agreement.
- Proposal can be approved, requested for revision, or rejected.

### 7. Booking confirmation

- Booking is confirmed after customer approval of the proposal.
- Booking includes vendor, planner, amounts, dates, and status.
- Payment instructions and status are visible.

### 8. Invoice tracking

- Invoices store issuer, payer, payee, source quote, amount, currency, status, due date, file reference, and audit history.
- Payment status is labeled reported, evidence-attached, or platform-recorded.
- No platform verification claim is made.

### 9. Vendor business tools

- Services, packages, rates, availability, portfolio, team members, branding, CRM, automation templates, analytics, and profile management.

### 10. Admin configuration

- Plans, prices, categories, verification, assignments, disputes, subscriptions, and audit review.
- No hardcoded prices or limits.

## Data requirements

- All monetary values use integer minor units plus ISO currency.
- Timestamps use UTC; event records retain an IANA timezone.
- Public search projections exclude private fields: phone, email, private requirements, invoices, evidence.

## Quality gates

- Role isolation tests on every change.
- Plan limit entitlement checks on every restricted action.
- Private file access tests with signed URLs.
- Audit logging tests for sensitive operations.
- Webhook idempotency tests.
