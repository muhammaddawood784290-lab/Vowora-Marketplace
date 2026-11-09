# Vowora Frontend Routing

## Route map

| Route | Component | Access |
| --- | --- | --- |
| `/` | `LandingPage` | Public |
| `/marketplace` | `MarketplaceBrowse` | Public |
| `/marketplace/category/:slug` | `MarketplaceBrowse` | Public |
| `/login` | `LoginPage` | Public |
| `/signup` | `SignupPage` | Public |
| `/dashboard/*` | `DashboardApp` with `ProtectedRoute` | Customer, vendor, planner, admin |
| `/admin/*` | `AdminApp` with `ProtectedRoute` | Admin |

## Role routing

- Customer routes render `CustomerDashboard`.
- Vendor routes render `VendorDashboard` with vendor-specific modules.
- Planner routes render `PlannerDashboard` with planner-specific modules.
- Admin routes render `AdminShell` with admin pages.

## Redirects

- Unauthenticated users are redirected to `/login`.
- Users with a non-allowed role are redirected to `/dashboard`.
- Admins are redirected to `/admin`.

## Navigation guards

- `AuthProvider` manages the auth state.
- `ProtectedRoute` enforces role-based access.
- Redirects are checked in the React Router layer.

## Exceptions

- Admin on `/dashboard` is redirected to `/admin`.
- Vendor or planner on `/admin` is redirected to `/dashboard`.

## Status

- **Implemented** — route structure and role guards.
- **Partially implemented** — backend role enforcement.
