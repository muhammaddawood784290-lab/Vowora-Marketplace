# Vowora Input Validation Security

## Rules

- Validate all input server-side.
- Enforce type, length, format, and value constraints.
- Sanitize file uploads.
- Use parameterized queries.

## File uploads

- Validate MIME type, extension, size, ownership, malware status, and retention.
- Store files in private or public buckets per object type.
- Serve private files with signed URLs.

## Status

- **Planned** — backend input validation not yet implemented.
