# Vowora Frontend Architecture

## Architecture overview

The Vowora frontend is a responsive React 19 application built with Vite and TypeScript. It is a client-only SPA replaced and served by the FastAPI backend in production.

## Components

```mermaid
graph TD
    A[React Router] --> B[AuthProvider]
    B --> C{ProtectedRoute}
    C -->|customer| D[CustomerDashboard]*[Marketplace, event brief, shortlist, proposals, bookings, invoices]
    C -->|vendor| E[VendorDashboard]
    C -->|planner| F[PlannerDashboard]
    C -->|admin| G[AdminShell]
    D --> H[Common components, layout, forms, tables]
    E --> H
    F --> H
    G --> H
```

## Layout

- `Layout` composes `Sidebar`, `TopNav`, and `Outlet`.
- Vendor and planner dashboards share 80–90% of layout and components.
- Customer has a separate marketplace and event view.

## State

- `useAuth` is the global context.
- Page-level state and component state handle UI.
- API responses are cached where appropriate.

## Data fetching

- `apiService` calls the backend with Bearer tokens.
- In local development without a backend, `apiService` returns mock data.
- Real API integration requires `VITE_API_CONNECTED=true`.

## Status

- **Implemented** — React, React Router, mock auth, and mock API.
- **Partially implemented** — API integration, role enforcement, and dashboards.
- **Blocked** — Real backend integration.
