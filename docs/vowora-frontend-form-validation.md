# Vowora Frontend Form Validation

## Strategy

- Client-side validation for immediate feedback.
- Server-side validation is authoritative.

## Validation rules

| Form | Rules |
| --- | --- |
| Login | Required email, required password, role-based demo credentials. |
| Signup | Required first name, last name, email, password, role, confirm password, password match. |
| Event brief | Type, date, timezone, location, guest count, budget, categories, notes, attachments. |
| Vendor profile | Company name, services, packages, rates, availability. |

## Accessibility

- All form inputs have labels.
- Error messages are announced to screen readers.
- Focus is managed for keyboard users.

## Status

- **Implemented** — client-side validation in forms.
- **Partially implemented** — server validation.
- **Planned** — inline validation UX.
