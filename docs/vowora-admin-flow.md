# Vowora Admin Flow

## Overview

The admin flow covers configuration, verification, assignments, disputes, subscriptions, audit review, and support actions.

## Login and access

- Admins log in with OIDC/SAML session.
- Admin routes require the `admin` role.
- Role check happens in the backend, not only in the UI.

## Dashboard

- Admin dashboard provides an at-a-glance view.
- Quick actions include plan configuration, category management, verification, and audit review.

## Configuration

- Admins configure plans, prices, features, and limits.
- Configuration changes are audit-recorded.
- No price or limit is hardcoded in application logic.

## Verification

- Admins review business verification submissions.
- Verification decisions are recorded with reason, actor, timestamp, and request ID.
- Verified status is enforced on public records.

## Assignments

- Admins can manually assign planners or vendors.
- Manual assignments create audit records for actor, action, resource, before/after, IP, and timestamp.

## Disputes

- Admins review and resolve disputes.
- Disputes are tied to evidence and payment status.
- Resolution creates an audit record.

## Subscriptions

- Admins monitor subscription status.
- Admins can manually verify a subscription payment.
- Plan changes preserve audit history.

## Audit review

- Admins review audit events.
- Audit events include actor, action, resource, before/after values, IP, and timestamp.

## Support actions

- Admins can perform support actions such as resetting passwords or unblocking accounts.
- Support actions require a reason, before/after values, actor, timestamp, and request ID.

## Exceptions

- Admin impersonation is prohibited by default.
- Support access is time-bound and audited with customer consent.

## Status transitions

| Entity | Transitions |
| --- | --- |
| Verification | pending, reviewed, approved, rejected |
| Assignment | pending, assigned, rejected |
| Dispute | open, evidence_requested, declined, resolved, closed |
| Subscription | trialing, active, past_due, suspended, cancelled |
| Audit | appended only |

## Security

- Admin routes require the `admin` role.
- Sensitive changes require a reason, before/after values, actor, timestamp, and request ID.
- Audit records are append-only.
