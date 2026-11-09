# Vowora Database Backup and Restore

## Backup strategy

- Automated full backups.
- Point-in-time recovery where supported.
- Backup retention per the data retention policy.
- Restore drills in the release quality checklist.

## Restore procedure

1. Identify restore point.
2. Schedule a maintenance window.
3. Run restore to a staging environment.
4. Verify data integrity.
5. Promote or update source of truth.

## Status

- **Planned** — backup tooling is not yet implemented.
