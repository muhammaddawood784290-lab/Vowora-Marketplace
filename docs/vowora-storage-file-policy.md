# Vowora Storage and File Policy

Store images, portfolios, invoices, identity files, and evidence in Supabase Storage or S3-compatible object storage. PostgreSQL stores only file metadata and paths.

## Buckets

- `public-listings`: approved public portfolio media.
- `private-documents`: invoices, identity documents, and payment evidence.
- `event-attachments`: customer event files.

Validate MIME type, extension, size, ownership, malware status, and retention policy. Use signed URLs for private files. Never expose private storage keys in the frontend.
