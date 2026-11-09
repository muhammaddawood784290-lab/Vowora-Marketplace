# Vowora Messaging Flow

## Status

- Messaging is a later module. Chat is scoped to an event or request and supports text, attachments, read status, moderation, reporting, retention, and audit events.
- Before live chat is introduced, use activity timelines, request-change forms, and email notifications through n8n.

## Flow

1. Customer and vendor communicate in an event-scoped channel.
2. Messages are stored with sender, receiver, timestamp, and role.
3. Attachments are stored in object storage and the path is recorded.
4. Read status is tracked per message.

## Security

- Messages are scoped to an event or request.
- All private messages are encrypted.
- Audit events record message access.

## Moderation

- Users can report messages or attachments.
- Admins review reports.
- Moderation actions are audit-recorded.
