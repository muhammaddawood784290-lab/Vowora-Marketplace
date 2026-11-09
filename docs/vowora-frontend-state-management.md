# Vowora Frontend State Management

## State layers

| Layer | Examples | Approach |
| --- | --- | --- |
| Global | User, role, authentication status | `AuthContext` |
| Page | Active tab, selected records, UI modals | `useState` |
| Component | Form fields, filters, loading | `useState`, `useReducer` where needed |
| Data | API responses | `apiService` with optional cache |

## Auth state

- `AuthProvider` initializes from `localStorage` in development.
- Calls `authService.login`, `authService.logout`, `authService.hasRole`.
- `useAuth` hook exposes user and role checks.

## Data flow

- Components call `apiService` methods.
- Response is stored in component state.
- Error and loading states are managed locally.

## Mock data strategy

- `apiService` returns `[]`(mock data) when `VITE_API_CONNECTED !== 'true'`.
- `mockData` store provides seeded examples.

## Status

- **Implemented** — auth context and mock data.
- **Partially implemented** — cache, optimistic updates.
- **Planned** — centralized state tooling for larger datasets.
