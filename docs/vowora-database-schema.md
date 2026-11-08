# Vowora Database Schema

PostgreSQL is the source of truth. All monetary values use integer minor units plus ISO currency. All timestamps use UTC; event records also retain an IANA timezone.

## Core tables

`users`, `roles`, `user_roles`, `customer_profiles`, `vendor_profiles`, `planner_profiles`, `events`, `categories`, `listings`, `packages`, `availability`, `media_assets`, `organizer_assignments`, `shortlists`, `shortlist_items`, `vendor_requests`, `quote_versions`, `proposals`, `proposal_items`, `bookings`, `invoices`, `payment_records`, `subscriptions`, `plans`, `plan_entitlements`, `notifications`, `audit_events`.

## Rules

- Every tenant-owned record has an owner or scoped role.
- Submitted quotes and approved proposals are immutable; corrections create versions.
- Files are stored outside PostgreSQL; only metadata and storage paths are stored here.
- Use foreign keys, unique constraints, soft deletion where auditability requires it, and indexes for owner, status, event, and created time.
