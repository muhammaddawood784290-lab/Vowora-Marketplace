# Vowora Product Requirements

## Requirements overview

### Customer requirements

- A customer can browse the marketplace and discover vendors and planners by category, location, budget, and availability.
- A customer can create an event brief with type, date, timezone, location, guest count, budget, required categories, notes, and attachments.
- A customer can request a planner, suggest one, or allow platform assignment.
- A customer can shortlist vendors and accept or request changes to the organizer shortlist.
- A customer can review a consolidated proposal with line items, organizer fee, terms, and validity.
- A customer can approve or request changes to a proposal.
- A customer can track bookings, statuses, invoices, and direct-payment instructions.

### Vendor requirements

- A vendor can create a business profile, service categories, service listings, packages, public starting and fixed prices, inclusions/exclusions, availability, and terms.
- A vendor receives event requests and can accept, reject, or counteroffer.
- A vendor can submit quotes with validity, taxes, fees, payment schedule, and cancellation terms.
- A vendor can issue or upload an invoice and preserve invoice versions.
- A vendor can record direct payment status and attach evidence.

### Planner requirements

- A planner can accept an assignment and review the customer brief.
- A planner can build and manage event shortlists.
- A planner can compare quotes and recommend, add, or replace vendors.
- A planner can create a consolidated proposal with source references and organizer fee.
- A planner can track booking and customer communication.

## Functional requirements

| Requirement | Priority | Status |
| --- | --- | --- |
| Customer event briefs with full metadata and attachments | P0 | Partially implemented |
| Planner assignment or selection | P0 | Partially implemented |
| Vendor shortlist and proposal approval | P0 | Partially implemented |
| Vendor requests with accept/reject/counteroffer | P0 | Partially implemented |
| Vendor quotes with version history | P0 | Partially implemented |
| Consolidated proposal with organizer fee | P0 | Partially implemented |
| Booking confirmation and status tracking | P0 | Partially implemented |
| Invoice records and payment status | P0 | Partially implemented |
| Vendor/planner business tools | P1 | Partially implemented |
| Admin configuration and audit review | P1 | Partially implemented |
| Email, notifications, and reminders | P1 | Partially implemented |
| Live chat | P2 | Blocked |
| Payment gateway | P2 | Blocked |
| Recommendation engine | P2 | Blocked |

## Constraints

- Vowora does not hold event funds in MVP.
- Payment status must be labeled reported, evidence-attached, or platform-recorded.
- No price is hardcoded in application logic.
- Plan limits are checked server-side.
- Files are stored in object storage; only metadata and paths are stored in PostgreSQL.
- Quotes and approved proposals are immutable; corrections create versions.
- Sensitive changes require a reason, before/after values, actor, timestamp, and request ID.

## Dependencies

- FastAPI backend for all business rules and data persistence.
- PostgreSQL as the transactional source of truth.
- Redis for caching and rate limiting where required.
- n8n for notifications, reminders, CRM actions, and plan templates.
- Object storage for files and signed URLs.
- Email provider for transactional and marketing email.

## Out of scope

- Payment custody and settlement in MVP.
- Live chat in MVP.
- AI/ML recommendation in MVP.
- Multi-vendor payments in one transaction.
- Real-time media streaming.

## Acceptance criteria

- Customer can complete the end-to-end event flow from brief to booking.
- Vendor and planner dashboards share 80–90% of layout and components.
- Admin can configure plans, verify users, and review audit events.
- All sensitive changes are recorded in an append-only audit log.
- Invoices and payment evidence are clearly labeled without platform verification claims.
