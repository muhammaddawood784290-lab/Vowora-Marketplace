# Vowora Frontend Accessibility

## Target

- WCAG 2.2 AA for core flows.

## Requirements

- All interactive elements are keyboard accessible.
- All form inputs have visible labels.
- Color contrast meets AA for text and UI components.
- Error messages are announced to screen readers.
- Focus order is logical.
- Skip links and landmarks are used.
- Status changes are communicated with text or ARIA live regions.

## Test plan

- Keyboard-only navigation through main flows.
- Screen reader pass for login and dashboard.
- Color contrast check for text and icons.
- Focus indicator visible in all states.
- Touch targets at least 44x44 CSS pixels.

## Status

- **Implemented** — semantic HTML and labels.
- **Partially tested** — manual checks.
- **Planned** — automated accessibility tests.
