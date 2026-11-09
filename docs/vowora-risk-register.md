# Vowora Risk Register

## Risk register

| ID | Risk | Likelihood | Impact | Score | Mitigation | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | Payment scope creep in MVP | Medium | High | High | Hard scope MVP; keep invoice records informational; defer gateway integration. | Product | High |
| R02 | Demo auth leaking into production | High | High | High | Replace demo store with real OIDC/SAML; remove demos before production build. | Security | Blocked |
| R03 | Object storage misconfiguration | Medium | High | High | Private-by-default; signed URLs; no private keys in frontend; malware validation. | DevOps | Planned |
| R04 | Audit gaps on sensitive changes | Medium | High | High | Append-only audit records with actor, action, resource, before/after, IP, timestamp. | Security | Planned |
| R05 | Recommendation bias or hidden sponsored content | Medium | Medium | Medium | Start with explainable rules and admin overrides; disclose sponsored providers. | Product | Planned |
| R06 | Role isolation regression | Medium | High | High | Automated tests for cross-event and cross-role access. | QA | Planned |
| R07 | Plan limit bypasses | Medium | High | High | Check entitlements server-side on every restricted action. | Engineering | Planned |
| R08 | Webhook replay or lost deliveries | Medium | Medium | Medium | Sign and verify webhooks; idempotency keys; retries with backoff; dead-letter queue. | DevOps | Planned |
| R09 | Database migration drift | Low | High | Medium | Migration-first workflow; review before rollout; point-in-time recovery. | DevOps | Planned |
| R10 | Scaling issues | Low | Medium | Low | Profile early; scale stateless app and queues; use managed database and object storage. | DevOps | Planned |
| R11 | Vendor trust issues | Medium | High | High | Verification, moderation, dispute process, and trust signals. | Operations | Planned |
| R12 | Currency and tax multiregion mistakes | Medium | Medium | Medium | Configurable country packs; integer minor units; UTC timestamps plus IANA timezone. | Engineering | Planned |
| R13 | Monitoring gap | Medium | High | High | Structured logs, metrics, traces, alerting for job failures, payment status changes, permission errors. | DevOps | Planned |
| R14 | Vendor/planner tooling incomplete | Medium | Medium | Medium | 80–90% shell reuse; role-specific modules only. | Product | Planned |
| R15 | Recommendation engine scope creep | Low | Medium | Low | Approve scope first; start with explainable rules. | Product | Proposed |

## Risk scoring

- **High** — immediate mitigation plan, owner assigned, tracked at weekly review.
- **Medium** — mitigation in place; review at monthly review.
- **Low** — monitored; address during expansion phase.

## Controls

- Automated role isolation tests on every backend change.
- Server-side entitlement checks for all restricted actions.
- Append-only audit events for sensitive operations.
- Private file storage with signed URLs and ownership checks.
- Signed and verified webhooks with idempotency keys.
- Managed database backups, point-in-time recovery, and restore drills.
