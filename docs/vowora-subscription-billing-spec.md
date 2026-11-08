# Vowora Subscription Billing Specification

Vendor and Planner subscriptions use configurable Silver, Gold, and Diamond plans. Entitlements are checked server-side on every restricted action.

Lifecycle: trial or pending → active → past due → grace period → suspended → cancelled. Plan changes preserve audit history and define immediate or next-cycle entitlement changes.
