# Vowora Security Architecture

## Principles

- Least privilege.
- Encryption in transit and at rest.
- Secure password hashing.
- MFA for admins.
- Tenant and event authorization on every request.

## Components

- OIDC/SAML identity provider.
- Secure HTTP-only cookies for browser sessions.
- Short-lived access tokens with refresh rotation.
- Backend authorization layer.
- Object storage private-by-default.
- Signed URLs for private files.

## Logging

- Security events logged separately from business audit events.
- Never log passwords, tokens, full payment evidence, or unnecessary personal data.

## Status

- **Partially implemented** — frontend auth demo.
- **Planned** — full security architecture in backend and infrastructure.
