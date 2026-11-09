# Vowora Security Threat Model

## Actors

- Customer
- Vendor
- Planner
- Admin
- Attacker
- Platform operator

## Threats

| Threat | Impact | Mitigation |
| --- | --- | --- |
| Credential stuffing | Account takeover | Rate limit, MFA for admins. |
| Cross-event access | Data leakage | Object-level authorization. |
| Cross-role access | Privilege escalation | Backend service enforcement. |
| Unencrypted data | Privacy breach | TLS everywhere; encryption at rest. |
| Insecure password storage | Account takeover | Secure hashing. |
| Malicious file upload | Storage abuse | Validation, malware scanning, signed URLs. |
| Webhook replay | Financial or status fraud | Sign and verify webhooks; idempotency keys. |
| Data leakage in search | Private info exposure | Projection excludes private fields. |
| Insufficient audit | Evidentiary gap | Append-only audit records. |

## Trust boundaries

- Frontend cannot trust users.
- Backend cannot trust frontend requests.
- Storage is private by default.
- Platform never claims payment verification.

## Status

- **Planned** — threat model to be updated with production architecture.
