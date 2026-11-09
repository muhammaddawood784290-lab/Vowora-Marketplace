# Vowora Frontend Testing Guide

## Strategy

- Unit tests for utilities and components.
- Integration tests for pages and forms.
- End-to-end tests for critical user flows.
- Accessibility and performance checks.

## Test types

| Type | Tool | Scope |
| --- | --- | --- |
| Unit | Vitest or Jest | Components, utilities, reducers |
| Integration | Vitest | Forms, state flows |
| E2E | Playwright | Critical user journeys |
| Accessibility | axe-core | Core flows |

## E2E scenarios

- Login and logout.
- Role-specific dashboards.
- Event briefs.
- Proposal approval and booking.
- Plan limits.
- Private file access.
- Admin configuration.

## Status

- **Partially implemented** — manual Playwright tests.
- **Planned** — automated unit and integration tests.
- **Blocked** — test infrastructure for production API.
