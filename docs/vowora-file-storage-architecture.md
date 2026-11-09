# Vowora File Storage Architecture

## Storage targets

- Supabase Storage or S3-compatible object storage.

## Buckets

| Bucket | Purpose |
| --- | --- |
| `public-listings` | Approved public portfolio media. |
| `private-documents` | Invoices, identity documents, payment evidence. |
| `event-attachments` | Customer event files. |

## Rules

- Validate MIME type, extension, size, ownership, malware status, and retention policy.
- Use signed URLs for private files.
- Never expose private storage keys in the frontend.
- Store only metadata and paths in PostgreSQL.

## Status

- **Planned** — storage buckets are not yet provisioned in this workspace.
