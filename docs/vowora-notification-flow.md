# Vowora Notification Flow

## Overview

Notifications are delivered through in-app records, email, and n8n workflows. Users control preferences by event type and channel.

## Notification types

- Assignment created.
- Request received.
- Quote submitted.
- Proposal sent.
- Proposal approved.
- Invoice issued.
- Payment status changed.
- Subscription renewal.
- Item expired.

## Flow

1. An event occurs in the core system.
2. The backend records an internal event.
3. The notification record is created in PostgreSQL.
4. n8n generates the email or reminder.
5. Delivery attempt, provider response, retry count, and final status are logged.
6. The user can mark notifications read in the UI.

## Delivery

- Preferences are stored per user.
- Transactional messages cannot be disabled where required for workflow.
- Marketing messages can be disabled.
- Delivery attempts include channel, status, provider response, retry count, and final status.

## Email

- Transactional email is sent for assignments, requests, quotes changes, proposal approvals, and subscription expiry.

## Exceptions

- In-app notification is always available.
- Email delivery is best-effort and recorded.
- Failed deliveries are retried with backoff and dead-letter handling.
