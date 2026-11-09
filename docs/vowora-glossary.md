# Vowora Glossary

## Core concepts

### Event
A customer's celebration or gathering: type, date, timezone, location, guest count, budget, and required categories. A customer creates an event brief, assigns a planner, shortlists vendors, approves a proposal, and tracks status.

### Vendor
A professional who lists services, packages, rates, and availability on the marketplace. Vendors receive incoming requests, submit quotes, and issue invoices.

### Planner
A coordinator who handles event briefs, builds shortlists, compares quotes, creates consolidated proposals, and tracks booked events.

### Customer
A person or organization planning an event. Customers browse vendors, shortlist providers, and approve proposals before booking.

### Subscription plan
A paid entitlement tier—Silver, Gold, or Diamond—that unlocks higher limits for portfolio images, packages, team members, n8n templates, analytics, and search visibility.

### Quote
A vendor's or planner's itemized price for services tied to a specific request. Quote versions are immutable; corrections create new versions.

### Proposal
A consolidated, customer-facing offer combining vendor quotes, organizer fees, terms, and validity. Proposals can be approved, rejected, or requested for revision.

### Booking
The confirmed engagement that results from a customer-approved proposal. It tracks the vendor, planner, amounts, dates, and status through completion.

### Invoice
A record of a direct customer-to-vendor or customer-to-planner obligation. Invoices store issuer, payer, payee, amount, currency, status, due date, and evidence references. In MVP, the platform does not hold, route, settle, or verify event funds.

### Payment status
The platform records how a payment is known to exist: `unpaid`, `reported` (self-reported), `evidence_attached` (evidence supplied), `platform_recorded` (platform-recorded), `disputed`, or `refunded`. It never claims platform verification.

## Roles and permissions

### Role
One of `customer`, `vendor`, `planner`, or `admin`. Roles are assigned in the backend service layer and tested independently of the UI.

### Object-level authorization
Every event, request, quote, proposal, invoice, file, and CRM record is scoped to the owning user. UI route guards are not the only enforcement point.

## Technical terms

### Backend (FastAPI)
The Python service that owns business rules, authentication, authorization, subscriptions, plan entitlements, CRM access, workflow transitions, audit events, and financial records.

### Frontend (React)
The responsive React application that renders role-specific dashboards, marketplace views, and admin panels. It calls the backend API through `apiService`.

### Database (PostgreSQL)
The transactional source of truth. Stores users, profiles, events, quotes, proposals, bookings, invoices, subscriptions, plans, audit events, notifications, and file metadata.

### Object storage
Supabase Storage or S3-compatible storage for portfolio media, invoices, identity documents, and payment evidence. Private objects use signed URLs.

### Redis
Used where required for caching, queues, and rate limiting.

### n8n
The automation layer that handles notifications, reminders, CRM actions, onboarding, expiry alerts, and approved plan templates. n8n must not become the source of truth.

### Queue and workers
Asynchronous jobs for notifications, expiry alerts, and assignment reminders. Every job includes an idempotency key, retry with backoff, and dead-letter handling.

## Visual and design terms

### Visual system
Black text, white surfaces, neutral gray borders, monochrome icons, clear spacing, and accessible contrast. No colored feature-specific themes.

### Package
A vendor or planner offering with a name, description, price, duration, inclusions, exclusions, and optional popularity or featured flags.

### CRM
A contact and lead database scoped to a vendor or planner. Used to track interactions, opportunities, and customer progression.

## Compliance terms

### Evidence
Documents or records that prove a payment, status, or action exists, such as bank statements, receipts, or gateway confirmations. Evidence is stored in object storage.

### Audit event
An append-only record of sensitive changes, including the actor, action, resource, before/after values, IP address, and timestamp.

### Consent and retention
Configurable policies by country for data collection, export, deletion, and legal hold.

## Status labels

| Label | Meaning |
| --- | --- |
| Implemented | Code and configuration exist and are verified. |
| Partially implemented | Some functionality exists but is incomplete. |
| Planned | Design is complete; implementation is scheduled. |
| Proposed | A recommendation or candidate design only. |
| Blocked | Dependent on another deliverable, approval, or third-party availability. |
