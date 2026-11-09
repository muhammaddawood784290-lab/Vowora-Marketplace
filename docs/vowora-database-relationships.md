# Vowora Database Relationships

## Entity relationships

```text
users 1—N user_roles
users 1—1 customer_profiles
users 1—1 vendor_profiles
users 1—1 planner_profiles
users 1—N subscriptions

events 1—N organizer_assignments
shortlists 1—N shortlist_items
events 1—N vendor_requests
vendor_requests 1—N quote_versions
events 1—N proposals
proposals 1—N proposal_items
proposals 1—1 booking
bookings 1—N invoices
invoices 1—N payment_records
users 1—N subscriptions
```

## Status

- **Planned** — relationship definitions precede backend implementation.
