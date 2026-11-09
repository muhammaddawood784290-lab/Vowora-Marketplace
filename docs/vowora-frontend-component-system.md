# Vowora Frontend Component System

## Component categories

| Category | Location | Purpose |
| --- | --- | --- |
| Common | `src/components/common/` | Reusable UI components: Button, Card, DataTable, EmptyState, Input, Modal, Tabs, StatusBadge. |
| Layout | `src/components/layout/` | Sidebar, TopNav, DashboardLayout, and shell components. |
| Dashboard | `src/pages/**/` | Role-specific pages and modules. |

## Design system

- Black text, white surfaces, neutral gray borders, monochrome icons.
- Clear spacing and accessible contrast.
- No colored feature-specific themes.

## Reusable components

### Button

- Primary, secondary, ghost, danger variants.
- Sizes: sm, md, lg, fullWidth.
- Loading state.

### Card

- Header, body, footer.
- Used for stat cards, profile cards, and content blocks.

### DataTable

- Column definitions, key field, loading and empty states.

### EmptyState

- Title, description, and optional action.

### Input

- Labels, placeholders, required, disabled, hints.

### Modal

- Overlay, header, body, footer, close.

### Tabs

- Tab panels for dashboard navigation.

### StatusBadge

- Visualizes status values across entities.

## State

- Global state is managed in `AuthProvider`.
- Page-level state uses `useState` and `useEffect`.
- API responses are cached where appropriate.

## Events

- Form submissions call API services.
- Role-specific dashboards call mock data or real API.
- Table actions edit or delete records.

## Status

- **Implemented** — common components.
- **Partially implemented** — role-specific pages and modules.
- **Blocked** — real API-driven state.
