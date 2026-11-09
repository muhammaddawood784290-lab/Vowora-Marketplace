# Vowora Authentication Flow

## Overview

The authentication flow covers signup, login, session management, and role-based access.

## Implementation note

The current React frontend uses a demo auth store and mocked API responses. Real authentication must replace this before production.

## Flow

### 1. Signup

- Customer provides email, password, and role.
- Demo signup auto-creates a matching demo user for local development.
- Real signup requires backend integration.

### 2. Login

- Customer enters email and password.
- Backend verifies credentials and issues a session or access token.
- Demo login uses `demo123` for seeded demo accounts.

### 3. Session or token

- Session: secure HTTP-only cookies.
- Token: short-lived access token with refresh rotation.
- Admins may require MFA.

### 4. Role-based access

- Customer, vendor, planner, and admin routes are protected.
- UI route guards are not the only enforcement point.
- Backend authorizes every event, request, quote, proposal, invoice, file, and CRM record.

### 5. Logout

- Clears the session or refresh token.
- Optional token invalidation on the auth provider.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Customer | `customer@vowora.com` | `demo123` |
| Vendor | `vendor@vowora.com` | `demo123` |
| Planner | `planner@vowora.com` | `demo123` |
| Admin | `admin@vowora.com` | `demo123` |

## Requirements

- Store passwords with secure hashing; never plaintext.
- Enforce MFA for admins.
- Support password reset and email verification.
- Rotate refresh tokens.
- Rate-limit login, registration, and password reset.
- Never log passwords, tokens, or full payment evidence.
- Enforce object-level authorization in the service layer.
