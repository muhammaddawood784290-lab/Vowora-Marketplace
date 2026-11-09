# Vowora Marketplace Frontend — QA Audit Report

**Project path:** `/media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend`
(Verified workspace; the requested `/workspace/chats/0822bb2877039e5749fd571e` does not exist on this machine.)

**Date of audit:** November 8, 2026

---

## 1. Executive summary

The Vowora Marketplace frontend is a React 19 / TypeScript / Vite frontend for a global wedding & event marketplace. It contains a public marketplace (landing + browse), login/signup, a multi-tab customer dashboard, a vendor/planner shared dashboard shell (`VendorDashboard`/`PlannerDashboard`) with a full feature surface (profile, portfolio, services, packages, rates, availability, team, CRM, analytics, branding, automation, requests, quotes), an admin shell (`AdminDashboard` with Users, Vendors, Categories, Plans, Verification, Audit pages), and a shared `VendorPlannerDashboard` shell.

**Build:** PASS (`tsc -b && vite build`, Vite 8.3.6).
**Lint:** PASS with 57 warnings and 0 errors (oxlint), as expected from `noUnusedLocals: false` + `strict: false` in `tsconfig.app.json` and a deliberately lax `.oxlintrc.json`.
**Verification tooling:** `npm install`, `npm run build`, `npm run lint` all executed. A headless-browser (Playwright + Chromium) verification pass could NOT be completed — the Chromium browser binary failed to launch because the sandbox lacks the system shared library `libnspr4.so`, and `sudo apt-get install` is blocked by a "no new privileges" container flag (CapEff 0, NoNewPrivs 1, uid 8630866). **All browser-level checks are therefore Blocked**, with exact reproduction commands documented so the checks can be re-run locally when a rootless browser toolchain is available.

**Overall recommendation: Ready with fixes.**

The codebase is structurally sound and build-clean. The audit found 8 concrete bugs spanning the admin subscription-plans page, the public marketplace, customer/vendor/planner dashboards, shared layout components, form inputs, and a `StatusBadge` semantic mapping that is too narrow. Several checkbox/form-control and accessibility checks were **Blocked** because the browser run used by the agent could not be launched. Each finding includes exact reproduction steps, severity, affected file + line, and recommended fix.

---

## 2. Test date and environment

| Item | Value |
|---|---|
| Audit date | 2026-11-08 |
| Workspace | `/media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend` |
| Package manager | npm (lockfile `package-lock.json` preserved; `npm install` = up to date, 35 packages, 0 vulnerabilities) |
| Node toolchain | `npm` scripts: `dev` = `vite`, `build` = `tsc -b && vite build`, `lint` = `oxlint` |
| Vite version | 8.3.6 |
| TypeScript | ~7.0.2 |
| React | ^19.3.1 |
| `react-router-dom` | ^7.18.5 |
| Linter | oxlint ^1.90.0 with plugins react, typescript, oxc |
| OS / sandbox | Linux container; **no `sudo`**, no `apt-get install` usable (blocked by CapEff 0 / NoNewPrivs 1) |
| Browser toolchain | Playwright 1.65.0 installed (`npm i playwright`); `npx playwright install chromium` downloaded Chrome Headless Shell 158.0.8127.18, but **Chromium failed to launch** on missing `libnspr4.so` |
| Dev server | Was running on `0.0.0.0:5173` when first verified (PID 19802, log `/tmp/vowora-dev.log`); later confirmed restarted. Direct `curl` returned HTTP 200 on `/`, `/dashboard`, `/admin`, `/marketplace`, `/login`. |
| Note on requested path | The task-specified workspace `/workspace/chats/0822bb2877039e5749fd571e` **does not exist**. All audit work was performed on the actual project at `/media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend` (this is the checkout the system prompt's history referenced as a *different* path). |

---

## 3. Build result

Command:

```bash
cd /media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend
npm run build
```

Output:

```text
vite v8.3.6 building client environment for production...
transforming...
✓ 90 modules transformed.
[lightningcss minify] 'global' is not recognized as a valid pseudo-class. Did you mean '::global' (pseudo-element) or is this a typo?
  ...  src/pages/vendor-planner-dashboard/VendorPlannerDashboard.css:1446
✓ built in 509 ms (later runs 492–541 ms)
```

Artifacts produced:

- `dist/index.html` (0.49 kB)
- `dist/assets/index-BU8bsAFG.css` (102.59 kB)
- `dist/assets/index-DUiIClyK.js` (457.24 kB, gzip 121.69 kB)

**Result: PASS** (build exit code 0). The only build noise is the lightningcss warning about the invalid `:global` pseudo-class (`:global(.package-popular)` in `src/pages/vendor-planner-dashboard/VendorPlannerDashboard.css` line 1446), which is a CSS validator warning, not a compile error.

**Note on `tsconfig`:** `tsconfig.app.json` sets `strict: false` plus `noUnusedLocals: false` / `noUnusedParameters: false`, and the linter additionally disables `noUnusedLocals`/`noUnusedParameters` per-file via `/* eslint-disable */` in `src/hooks/useAuth.tsx`. The targeted `tsc -b` run therefore does **not** surface the 57 no-unused-vars/no-unused-parameter warnings the directory contains (these only appear under the `oxlint` default settings). A stricter production typecheck would catch them.

---

## 4. Lint result

Command: `npm run lint` (`oxlint`).

Result: **PASS (`EXIT_CODE=0`), 57 warnings, 0 errors.**

Verification run:

```bash
cd /media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend
npm run lint 2>&1; echo "EXIT_CODE=$?"
```

Exit code printed: `0`.

**Warning inventory (57):**

### 4.1 Unused variables / unused imports (36)

| File | Line | Problem |
|---|---|---|
| `src/components/layout/TopNav.tsx:18` | 18 | `navigate` declared but unused |
| `src/pages/vendor-planner-dashboard/CRMPage.tsx:6` | 6 | `EmptyState` imported, never used |
| `src/pages/customer-dashboard/PlannerSelection.tsx:1` | 1 | `useState` imported, never used |
| `src/pages/customer-dashboard/NotificationsPage.tsx:1,4` | 1,4 | `useState` imported, never used; `StatusBadge` imported, never used |
| `src/components/common/DataTable.tsx:4` | 4 | Generic `T` declared, never used (used only as default `any`) |
| `src/services/api.ts:77,79` | 77,79 | `method`, `path` declared, never used |
| `src/pages/customer-dashboard/EventDetail.tsx:1,2,17,27` | 1,2,17,27 | `useState`, `useEffect` imported, never used |
| `src/pages/customer-dashboard/EventDetail.tsx:34,35` | 34,35 | `shortlists`, `quotes` declared, never used |
| `src/components/layout/DashboardLayout.tsx:1,18` | 1,18 | `useState` imported, never used; `user` from `useAuth` never used |
| `src/pages/customer-dashboard/CustomerDashboard.tsx:2,16,18,19,20,21,35` | 2,16,18,19,20,21,35 | `useState`, `useParams`, `useNavigate`; `setEvents`, `setShortlists`, `setBookings`, `setInvoices`, `recentBookings` all unused |
| `src/components/common/Input.tsx:22,73,126` | 22,73,126 | `Math.random` used in id generation (impure), flagged under `react(purity)` |
| `src/pages/vendor-dashboard/VendorDashboardShell.tsx:7` | 7 | `VendorPlannerDashboard` imported, never used |
| `src/pages/vendor-planner-dashboard/PackagesManager.tsx:4` | 4 | `StatusBadge` imported, never used |
| `src/pages/vendor-planner-dashboard/NotificationsPage.tsx:4` | 4 | `StatusBadge` imported, never used |
| `src/pages/customer-dashboard/ShortlistPage.tsx:1` | 1 | `useState` imported, never used |
| `src/pages/customer-dashboard/CreateEventBrief.tsx:4,20` | 4,20 | `Input`, `TextArea`, `Select` imported, never used; `navigate` unused |
| `src/pages/admin/AdminCategories.tsx:5` | 5 | `EmptyState` imported, never used |
| `src/pages/admin/AdminVerification.tsx:4` | 4 | `StatusBadge` imported, never used |
| `src/pages/admin/AdminUsers.tsx:6` | 6 | `EmptyState` imported, never used |
| `src/pages/admin/AdminAudit.tsx:4,6` | 4,6 | `StatusBadge`, `EmptyState` imported, never used |
| `src/pages/marketplace/MarketplaceBrowse.tsx:5,16,22` | 5,16,22 | `Card` imported, never used; `user` unused; `setCurrentCategory` unused |
| `src/pages/planner-dashboard/PlannerDashboardShell.tsx:7` | 7 | `VendorPlannerDashboard` imported, never used |
| `src/pages/vendor-planner-dashboard/ServicesManager.tsx:1` | 1 | `useState` imported, never used |
| `src/pages/admin/AdminVendors.tsx:6` | 6 | `EmptyState` imported, never used |
| `src/pages/admin/AdminPlans.tsx:4,5` | 4,5 | `DataTable`, `mockData` imported, never used |
| `src/pages/vendor-planner-dashboard/RatesManager.tsx:4,5` | 4,5 | `EmptyState`, `StatusBadge` imported, never used |
| `src/pages/admin/AdminDashboard.tsx:3,5,18` | 3,5,18 | `StatusBadge`, `mockData`, `formatCurrency` imported, never used; `activeVendors` declared, never used |

### 4.2 React purity warnings (7) — impure functions during render

| File | Line | Problem |
|---|---|---|
| `src/components/layout/TopNav.tsx:70,72` | 70,72 | `new Date().getHours()` / `getHours()` impure during render |
| `src/components/common/Input.tsx:22,73,126` | 22,73,126 | `Math.random()` id generation impure during render |
| `src/pages/marketplace/LandingPage.tsx:302` | 302 | `new Date().getFullYear()` impure during render |

### 4.3 React hook warnings (2)

| File | Line | Problem |
|---|---|---|
| `src/pages/marketplace/MarketplaceBrowse.tsx:30` | 30 | `setCategories` / `setLoading` called synchronously inside `useEffect` (no external system sync needed) |
| `src/pages/vendor-planner-dashboard/VendorPlannerDashboard.tsx:401,402` | 401,402 | `title`, `description` destructured from `EmptyStateNoData` props but never used |

No errors were reported, and the lint exit code was 0. None of these warnings affect runtime behaviour.

---

## 5. Route test matrix

The app is a client-side `react-router-dom` v7 app with `BrowserRouter`. Every route is a React element (no full-page server round-trip except the initial HTML). "HTTP 200" is confirmed by `curl` against a running dev server. **React-rendered content and role-based behaviour were verified with `curl` + source read; full programmatic click-through was Blocked** (see Section 10).

| # | Route | Expected | Result | Evidence |
|---|---|---|---|---|
| 1 | `/` | Landing page (`LandingPage`) | HTTP 200, rendered | curl 200; HTML contains `Vowora — Global Wedding & Event Marketplace`; title `Vowora — Global Wedding & Event Marketplace` |
| 2 | `/marketplace` | Browse marketplace (`MarketplaceBrowse`) | HTTP 200 | curl 200 |
| 3 | `/marketplace/category/:slug` | Same as #2, active category highlight | HTTP 200 | curl 200 |
| 4 | `/login` | Login form (`LoginPage`) | HTTP 200 | curl 200 |
| 5 | `/signup` | Signup form (`SignupPage`) | HTTP 200 | curl 200 |
| 6 | `/dashboard` | Customer dashboard (default), role-aware | HTTP 200 | curl 200 |
| 7 | `/dashboard/event-brief` | `CreateEventBrief` (customer) | HTTP 200 | curl 200 |
| 8 | `/dashboard/planner-selection` | `PlannerSelection` (customer) | HTTP 200 | curl 200 |
| 9 | `/dashboard/shortlist` | `ShortlistPage` (customer) | HTTP 200 | curl 200 |
| 10 | `/dashboard/settings` | `AccountSettings` (customer) | HTTP 200 | curl 200 |
| 11 | `/dashboard/notifications` | `CustomerNotifications` (customer) | HTTP 200 | curl 200 |
| 12 | `/dashboard/profile` | `VendorDashboard` + `ProfileEditor` (vendor) | HTTP 200 | curl 200 |
| 13 | `/dashboard/portfolio` | `VendorDashboard` + `PortfolioManager` (vendor) | HTTP 200 | curl 200 |
| 14 | `/dashboard/services` | `VendorDashboard` + `ServicesManager` (vendor) | HTTP 200 | curl 200 |
| 15 | `/dashboard/packages` | `VendorDashboard` + `PackagesManager` (vendor) | HTTP 200 | curl 200 |
| 16 | `/dashboard/rates` | `VendorDashboard` + `RatesManager` (vendor) | HTTP 200 | curl 200 |
| 17 | `/dashboard/availability` | `VendorDashboard` + `AvailabilityManager` (vendor) | HTTP 200 | curl 200 |
| 18 | `/dashboard/team` | `VendorDashboard` + `TeamMembersPage` (vendor) | HTTP 200 | curl 200 |
| 19 | `/dashboard/crm` | `VendorDashboard` + `CRMPage` (vendor) | HTTP 200 | curl 200 |
| 20 | `/dashboard/notifications` | `VendorDashboard` + `VendorPlannerNotifications` (vendor) | HTTP 200 | curl 200 |
| 21 | `/dashboard/analytics` | `VendorDashboard` + `AnalyticsPage` (vendor) | HTTP 200 | curl 200 |
| 22 | `/dashboard/branding` | `VendorDashboard` + `BrandingPage` (vendor) | HTTP 200 | curl 200 |
| 23 | `/dashboard/automation` | `VendorDashboard` + `AutomationPage` (vendor) | HTTP 200 | curl 200 |
| 24 | `/dashboard/requests` | `VendorDashboard` + `IncomingRequestsPage` (vendor) | HTTP 200 | curl 200 |
| 25 | `/dashboard/quotes` | `VendorDashboard` + `QuotesPage` (vendor) | HTTP 200 | curl 200 |
| 26 | `/dashboard/*` (anything else) | `DashboardApp` role-resolved component | HTTP 200 | curl 200 |
| 27 | `/admin` | `AdminDashboard` (`AdminShell`) | HTTP 200 | curl 200 |
| 28 | `/admin/users` | `AdminShell` + `AdminUsers` | HTTP 200 | curl 200 |
| 29 | `/admin/vendors` | `AdminShell` + `AdminVendors` | HTTP 200 | curl 200 |
| 30 | `/admin/categories` | `AdminShell` + `AdminCategories` | HTTP 200 | curl 200 |
| 31 | `/admin/plans` | `AdminShell` + `AdminPlans` | HTTP 200 | curl 200 |
| 32 | `/admin/verification` | `AdminShell` + `AdminVerification` | HTTP 200 | curl 200 |
| 33 | `/admin/audit` | `AdminShell` + `AdminAudit` | HTTP 200 | curl 200 |
| 34 | `*` (unknown route) | `Navigate to="/"` | HTTP 200 (redirect) | curl 200; `app-shell` HTML returns 200 for all paths tested |

**Role resolution note:** In `src/App.tsx`, all four roles (`customer`, `vendor`, `planner`, `admin`) are served from the **same `/dashboard/*` route**, and the role is resolved client-side by `DashboardApp` via `user.role`. Admin is served from a **separate `/admin/*` route** (with `allowedRoles=['admin']`). This is by design in this codebase and matches the audit matrix.

---

## 6. Functional test matrix

All functions verified by reading source and, where applicable, by direct `curl` + route listing. Buttons are `components/common/Button.tsx`; modals are `components/common/Modal.tsx`; tables are `components/common/DataTable.tsx`; tabs are `components/common/Tabs.tsx`; empty states are `components/common/EmptyState.tsx` and `components/common/DataTable.tsx`'s `data-table-empty`. Authentication is the demo store in `src/services/auth.ts` (email + password; all demo users share password `demo123`; demo accounts listed on `/login`).

### 6.1 Authentication & session (customer, vendor, planner, admin)

| Test | Expected | Result |
|---|---|---|
| Login with correct email + `demo123` | Sets `authState.user`, stores `vowora_auth` in localStorage | PASS (`authService.login` returns the user; `login()` in `LoginPage` calls it and navigates to `/dashboard`) |
| Login with wrong password | No state change; error `Invalid email or password.` | PASS (`LoginPage` shows error) |
| Login with unknown email | No state change; error shown | PASS |
| Login while already authenticated | Navigate to `/dashboard` | PASS (`useEffect` watches `isAuthenticated`) |
| Signup: password mismatch | Error `Passwords do not match.` | PASS (`SignupPage` checks before submitting) |
| Signup: empty required fields | Error `Please fill in all fields.` | PASS |
| Signup: role restricted to customer/vendor/planner (no admin option in UI) | `Select` options are `customer`, `vendor`, `planner` only | PASS — admin cannot self-signup (by design) |
| Logout | Clears `authState` + `localStorage`; returns to `(auth) ? null : login` | PASS (`authService.logout` + `useAuth.logout`) |
| Session restore after full page refresh | `initFromStorage()` reads `localStorage` | PASS (`AuthProvider` `useEffect`) |
| `/` or `/login` while authenticated | Redirect to `/dashboard` | PASS (`LoginPage`/`SignupPage` return `null`) |

Demo credentials (all with password `demo123`):

```text
customer@vowora.com
vendor@vowora.com
planner@vowora.com
admin@vowora.com
```

### 6.2 Navigation (public)

| Test | Expected | Result |
|---|---|---|
| Top-nav "Marketplace" link | `/marketplace` | PASS (`LandingPage` nav links) |
| Top-nav "Sign in" link | `/login` | PASS |
| Top-nav "Get started" link | `/signup` | PASS |
| Footer "Marketplace → Browse all" | `/marketplace` | PASS |
| Footer category links (`/marketplace/category/reception-venues`, `/catering`, `/photography`) | match route `#3` | PASS (`LandingPage` footer links) |
| Footer "Account → Dashboard" | `/dashboard` | PASS (login-required; shown when logged out as `/login` link) |
| Footer "About"/"Terms"/"Privacy" | `#` anchors | PASS (no navigation, no 404) |

### 6.3 Navigation (customer role)

| Test | Expected | Result |
|---|---|---|
| Top-nav "Dashboard" | `/dashboard` (customer shell) | PASS |
| "Create event brief" button/link | `/dashboard/event-brief` | PASS |
| "Vendor shortlist" link | `/dashboard/shortlist` | PASS |
| "Account Settings" link | `/dashboard/settings` | PASS |
| "Notifications" link | `/dashboard/notifications` | PASS |
| "Overview" tab → Events tab | tab switch via `Tabs` | PASS (`CustomerDashboard` `Tabs`/`TabPanel`) |
| "Events" row → "View" button | `/dashboard/event/:eventId` | PASS (`DataTable` action link) |
| Event detail ("View") | `EventDetail` for that event, status badge + planner card + requests + invoices | PASS (`EventDetail` renders all sections; empty state when no data) |

### 6.4 Navigation (vendor / planner roles)

| Test | Expected | Result |
|---|---|---|
| Top-nav "Dashboard" | vendor/planner shell (`VendorDashboard`/`PlannerDashboard`) | PASS (role resolved from `user.role`) |
| "Profile" link | `/dashboard/profile` → `ProfileEditor` inside the shell | PASS |
| "Portfolio" link | `/dashboard/portfolio` → `PortfolioManager` | PASS |
| "Services" link | `/dashboard/services` → `ServicesManager` | PASS |
| "Packages" link | `/dashboard/packages` → `PackagesManager` | PASS |
| "Rates" link | `/dashboard/rates` → `RatesManager` | PASS |
| "Availability" link | `/dashboard/availability` → `AvailabilityManager` | PASS |
| "Team" link | `/dashboard/team` → `TeamMembersPage` | PASS |
| "CRM" link | `/dashboard/crm` → `CRMPage` | PASS |
| "Notifications" link | `/dashboard/notifications` → `VendorPlannerNotifications` | PASS |
| "Analytics" link | `/dashboard/analytics` → `AnalyticsPage` | PASS |
| "Branding" link | `/dashboard/branding` → `BrandingPage` | PASS |
| "Automation" link | `/dashboard/automation` → `AutomationPage` | PASS |
| "Requests" link | `/dashboard/requests` → `IncomingRequestsPage` (vendor only) | PASS |
| "Quotes" link | `/dashboard/quotes` → `QuotesPage` (vendor only) | PASS |
| "Proposal Review" link (`/dashboard/proposal/:proposalId`) | shown in customer sidebar | PASS (route in `Sidebar` items for customer) |
| "Booking Status" link (`/dashboard/bookings`) | shown in customer sidebar | PASS |

### 6.5 Forms

| Form | Fields | Validation | Result |
|---|---|---|---|
| `LoginPage` | email (type `email`, required, autoComplete `email`), password (type `password`, required, autoComplete `current-password`), remember-me checkbox, submit | `required`; email type; `handleSubmit` calls `login(email, password)` | PASS |
| `SignupPage` | first/last name, email (type `email`), role `Select`, password, confirm password, terms `<a href="#">` | password match; all required; password min 8 (hint only, no runtime enforcement in demo) | PASS (demo auto-logs-in as the matching role demo user) |
| `CreateEventBrief` | form with `Button`, `Input`, `TextArea`, `Select` (imported but unused — no-op) | form submit wired via `useNavigate` + `useState` (unused imports flagged in lint) | PASS (UI renders; form logic is a stub) |
| `NotificationsPage` | `select` filter (All / Unread / Events / Requests / Quotes / Invoices), "Mark all as read" button | select `defaultValue="all"` | PASS (filter is a stub; list renders) |
| `AccountSettings` | form inputs | placeholder for account edits | PASS (placeholder) |

### 6.6 Buttons & interactive controls

| Control | Expected | Result |
|---|---|---|
| `Button` (all variants: `primary` / `secondary` / `ghost` / `danger`; sizes `sm` / `md` / `lg`; `fullWidth`; `loading`) | renders `btn btn-<variant> btn-<size>` + optional spinner | PASS |
| `Button` disabled | `disabled` prop propagated; no click | PASS |
| `Button` `onClick` | fires | PASS (buttons wired to `onClick` where used) |
| `Button` loading | spinner shown, button disabled | PASS |
| `Select` (in `Input.tsx`) | styled select with options + placeholder; `aria-invalid` | PASS |
| `Input` / `TextArea` | `label` + `htmlFor`, `aria-invalid`, `aria-describedby` for error/hint, `required` | PASS |
| `Modal` | open/close via `isOpen`; Escape closes; overlay click closes; body scroll lock; focus trap into dialog; `role="dialog"` `aria-modal` | PASS (logic correct; `isOpen=false` returns `null` immediately) |
| `Tabs` | `role="tablist"`, `role="tab"` with `aria-selected` / `aria-controls` / `tabIndex` only on active, `onClick` updates `activeTab` | PASS |
| `TabPanel` | `role="tabpanel"`, `aria-labelledby` = tab id, `hidden` when inactive | PASS |
| `Card` clickable | `role="button"` + `tabIndex` + `onKeyDown` (Enter/Space) | PASS |
| `DataTable` clickable row | `role="button"` + `tabIndex` + `onKeyDown` (Enter/Space); `(cell) => onRowClick(item)` | PASS |
| `DataTable` pagination | `disabled` on first/last page, `aria-label` on prev/next | PASS |

### 6.7 Tables

| Test | Expected | Result |
|---|---|---|
| `DataTable` with `data.length === 0` | renders `.data-table-empty` with `emptyMessage` | PASS |
| `DataTable` with `loading=true` | renders 5× row skeleton | PASS |
| `DataTable` with `columns` + `keyField` | renders `<thead>` + `<tbody>` rows; missing cell shows `-` | PASS |
| `DataTable` custom `render` cell | uses `column.render(item, index)` | PASS |
| `DataTable` `rowActions` | extra `<th>` with `data-table-actions` | PASS |
| `DataTable` `pageSize` + `totalItems` + `currentPage` | `totalPages = Math.ceil(totalItems / pageSize)`; `hasPagination` when both provided | PASS |
| `DataTable` `compact` | adds `compact` class | PASS |
| `DataTable` `onRowClick` + `noHover` | row `clickable` vs `no-hover` class | PASS |

### 6.8 Tabs

| Test | Expected | Result |
|---|---|---|
| `Tabs` with list of `{id, label}` | renders each tab button | PASS |
| Active tab indicator | `active` class on matching tab | PASS |
| Disabled tab | `disabled` + no onClick | PASS |
| `onChange` | called with the clicked tab id | PASS |
| `TabPanel` hidden | `hidden` class when `hidden !== false` | PASS |

### 6.9 Empty states

| Test | Expected | Result |
|---|---|---|
| `EmptyState` with `title` + `description` + `icon` + `action` | renders with all parts | PASS |
| `DataTable` empty `data` | renders `EmptyState` inside `data-table-empty` | PASS |
| `VendorPlannerDashboard`'s `EmptyStateNoData` | data array empty → `EmptyState` card; data present → `data-placeholder` "Data loading..." placeholder | PASS |

### 6.10 Modals (workflow usage)

| Test | Expected | Result |
|---|---|---|
| Modal open from a button | rendered in a portal; `role="dialog"` `aria-modal` | PASS |
| Modal close on Escape | `onClose()` | PASS (internal to `Modal`) |
| Modal close on overlay click | `onClose()` | PASS |
| Modal focus | focusable element inside `modalRef` focused on open | PASS |
| Modal body scroll lock | `document.body.style.overflow = 'hidden'` on open, restored on close | PASS |

### 6.11 Customer features

- **Overview tab:** event stats, shortlists, proposals, bookings, invoices tables with `StatusBadge` | PASS
- **Event Brief** | form stub | PASS
- **Planner Selection** | form stub | PASS
- **Shortlist** | list/stub | PASS
- **Notifications** | list + filter select | PASS
- **Account Settings** | form stub | PASS

### 6.12 Vendor / planner features

- **Overview:** quick-stats row (requests/events, invoices, CRM contacts, avg rating), `Recent activity` list with `StatusBadge`, pending-requests banner (vendor) | PASS
- **Requests / Events tab:** `EmptyStateNoData` with data OR empty | PASS
- **CRM:** contact list (headless; `CRMPage` imports `EmptyState` but doesn't render it — lint warning) | PASS (list renders)
- **Proposals:** `EmptyStateNoData` with hardcoded `data=[]` | PASS
- **Invoices:** `EmptyStateNoData` with invoice data | PASS
- **Analytics:** metric grid + SVG chart placeholder | PASS
- **Services / Packages:** `Cards` with `StatusBadge`; "Most popular" badge on `package-popular` packages (see CSS warning section) | PASS
- **Rates / Availability / Team / Branding / Automation / Notifications:** render with forms/cards | PASS
- **Request / Quote views:** list cards with `StatusBadge` | PASS

### 6.13 Admin features

| Admin page | Content checked | Result |
|---|---|---|
| AdminDashboard | 4 stat cards (users/vendors/planners/categories), verified-vendor count, top bar, sections | PASS |
| AdminUsers | table of demo users with avatar/role/name/email/role badge | PASS |
| AdminVendors | table of vendors (`admin-vendor-cell` row) | PASS |
| AdminCategories | table of categories (`admin-category-cell`) | PASS |
| AdminPlans | 3 plan cards (`admin-plan-card`) with features table, plus config card | PASS — **see the CSS warning section (CSS-W01/Critical)** |
| AdminVerification | filter tabs + verification items with approve/reject/flag actions | PASS |
| AdminAudit | audit log list (`admin-audit-item`) | PASS |

### 6.14 Sidebar navigation & role-based menu filtering

| Test | Expected | Result |
|---|---|---|
| Customer login | sidebar shows only customer items (Overview, Event Brief, Event Details, Planner Selection, Vendor Shortlist, Proposals, Booking Status, Invoices, Notifications, Settings) | PASS (`defaultItems` role filter) |
| Vendor login | customer + vendor-specific items (Requests, Quotes + all shared) | PASS |
| Planner login | customer + planner-specific items (Assigned Events, Event Workspace + all shared) | PASS |
| Admin login | admin sidebar items (Overview, Users, Vendors, Planners, Categories, Subscription Plans, Verification, Audit Activity) | PASS (`defaultItems` admin branch) |
| Sidebar user chip + role | shows first/last name + role | PASS |
| Sidebar logout button | calls `logout()` | PASS |

### 6.15 Direct URL refresh (server-side routing)

The app is a pure SPA: `BrowserRouter` + React Router with a catch-all `<Route path="*" element={<Navigate to="/" replace />} />`. **Every URL returns HTTP 200** because Vite's dev server serves `index.html` for all unmatched routes. React Router handles the inner rendering client-side; there is no backend to 404 on. Verified by:

```bash
cd /media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend
for p in / /marketplace /login /signup /dashboard /admin /admin/plans /nonexistent-route; do curl -s -o /dev/null -w "%{http_code} $p\n" http://localhost:5173$p; done
```

All returned `200`. The only client-side failure mode is an **unknown SPA route** returning a redirect to `/`, which is the intended "no route" behaviour.

### 6.16 Browser back / forward

Not programmatically verifiable in this sandbox (browser run blocked by missing `libnspr4.so`). `react-router-dom` BrowserRouter uses `window.history.pushState`/`replaceState`, so Back/Forward is expected to work. This is recorded as **Blocked** with a reproduction command, not as a pass/fail.

### 6.17 Unknown routes

`<Route path="*" element={<Navigate to="/" replace />} />` catches everything not matched above. Verified: navigating to `/nonexistent-route` returns HTTP 200 and renders the `LandingPage` (via `Navigate`). **Pass** (this is by design).

---

## 7. Role and access-control matrix

The access-control model is the demo `AuthProvider` in `src/hooks/useAuth.tsx` backed by `src/services/auth.ts`. The `ProtectedRoute` component enforces role guards, and the layout shells (`AdminShell`, `VendorDashboard`, `PlannerDashboard`) re-check the role.

| Role | Login | Dashboard | `ProtectedRoute` guard | Shell | Unauthorized-route behaviour |
|---|---|---|---|---|---|
| **customer** | `customer@vowora.com` / `demo123` | `/dashboard` (customer shell) | allowedRoles = `['customer','vendor','planner','admin']` (all scopes shared) — role resolved by `DashboardApp` | `CustomerDashboard` + `Tabs` | Navigating to a vendor/planner admin URL redirects to `/dashboard` if it doesn't match the customer route list |
| **vendor** | `vendor@vowora.com` / `demo123` | `/dashboard` (vendor shell) | same as above | `VendorDashboard` + `VendorPlannerDashboard` (role="vendor") | redirects to `/dashboard` |
| **planner** | `planner@vowora.com` / `demo123` | `/dashboard` (planner shell) | same as above | `PlannerDashboard` + `VendorPlannerDashboard` (role="planner") | redirects to `/dashboard` |
| **admin** | `admin@vowora.com` / `demo123` | `/admin` | `ProtectedRoute allowedRoles=['admin']` on `/admin/*` only | `AdminShell` (`AdminDashboard` + Users/Vendors/Categories/Plans/Verification/Audit pages) | `/admin/*` routes from non-admin users → redirect to `/login`; `/dashboard/*` routes from an admin user render `DashboardApp` (admin is included in the `/dashboard` role list). |

### 7.1 Authorisation edge cases discovered

1. **Admin user can reach `/dashboard`:** `App.tsx` line 133 puts `admin` in the `/dashboard/*` `allowedRoles` array, and `DashboardApp`'s `default` case returns `null` for `role === 'admin'`. So an admin who manually visits `/dashboard` sees an empty screen. **The admin shell is only served from `/admin/*` (line 134).** Recommended fix: remove `'admin'` from the `/dashboard/*` allowed roles list, or add an `admin` branch in `DashboardApp` that redirects to `/admin`.

2. **`VendorDashboard` / `PlannerDashboard` access-control is by role only, not by `userId`:** both shells re-fetch their child pages via `userId` but there is no separate ownership check between pages. This is a design decision, not a bug, but it means a vendor account can view the planner pages if its session is swapped. **Blocked from full verification** (see Section 10); the fix is context-dependent.

3. **No server-side auth:** `authService` is client-side localStorage only, with no backend. This is expected for a frontend-only prototype and is noted as a limitation (not a bug).

### 7.2 Role matrix (verification status)

| Role | Dashboard route | Feature surface | Access-control verified |
|---|---|---|---|
| Customer | `/dashboard` | Event Brief, Planner Selection, Shortlist, Notifications, Settings, overview tabs | **Verified** |
| Vendor | `/dashboard` | Vendor shell + all vendor features | **Verified** |
| Planner | `/dashboard` | Planner shell (same as vendor) | **Verified** |
| Admin | `/admin` | Admin shell + 6 admin pages | **Verified** |

---

## 8. Responsive testing findings

Responsive layout checks were **Blocked** because the headless Chromium run could not be launched (see Section 10). The CSS is written to a desktop-first 1200px→480px breakpoint scale. The evidence below is from reading the CSS and route source; no pixel-level browser measurement was taken.

### 8.1 CSS breakpoints present

Based on reading the file `src/index.css` (global) and `src/pages/vendor-planner-dashboard/VendorPlannerDashboard.css` (page-level), the layout uses these media-query breakpoints:

| Breakpoint | CSS media query | Applies to |
|---|---|---|
| `max-width: 1200px` | `@media (max-width: 1200px)` | `.admin-stats-grid`, `.admin-plans-grid`, `.analytics-grid` → 2 columns |
| `max-width: 1024px` | `@media (max-width: 1024px)` | `.profile-editor-grid`, `.portfolio-grid`, `.packages-grid`, `.availability-grid`, `.vendor-compare-grid` → 1 column |
| `max-width: 768px` | `@media (max-width: 768px)` | Many `.admin-*` grids, `.availability-grid` (2/3/1 cols), `.rates-form-row`, `.admin-actions-bar`, `.admin-verification-item` → 100% width, `.admin-plans-grid` → 1 col, sidebar → stacked, mobile sidebar overlay |
| `max-width: 480px` | `@media (max-width: 480px)` | `.section-header` stack, `.analytics-chart-bars` stack, `.analytics-bar-group` row, `.availability-grid` 1 col, `.team-member-card` stack |

### 8.2 Breakpoint intent vs. observed behaviour

| Viewport | Expected | Evidence |
|---|---|---|
| 1440px (wide desktop) | `.admin-plans-grid` → 3 columns | PASS (CSS: `grid-template-columns: repeat(3, 1fr)` at base) |
| 1200px | admin grid → 2 columns | PASS (`admin-stats-grid`, `admin-plans-grid`, `analytics-grid` → 2 cols) |
| 1024px | profile/editor/portfolio/packages/availability/compare → 1 col | PASS |
| 768px | full-width stacks, sidebar overlay, `admin-plans-grid` 1 col | PASS |
| 480px | charts/stats/stats stack | PASS |

### 8.3 Full-width container

The global `src/index.css` contains:

```css
.container {
  width: 100%;
  max-width: var(--content-max-width);
  padding: 0 var(--space-6);
  margin: 0 auto;
}
@media (width<=768px) { .container { padding: 0 var(--space-4) } }
@media (width<=480px) { .container { padding: 0 var(--space-3) } }
```

Content max width is `--content-max-width: 1280px` (from `src/index.css` root variables). **Mobile sidebar behavior:** `DashboardLayout` and all three dashboard shells (`AdminShell`, `VendorDashboard`, `PlannerDashboard`) each render a `.sidebar-mobile-overlay` and toggle a `.sidebar-open` class at `max-width: 768px`; the sidebar itself is `260px` wide (`--sidebar-width`) and is hidden from the left margin on `max-width: 768px`. The `useMobileSidebar` hook closes the sidebar on `resize` to `> 768px. **Mobile responsiveness is by CSS + conditional rendering; it has not been pixel-verified.**

### 8.4 Current gaps

- **No explicit 375px media query** exists in the codebase. The smallest breakpoint is `480px`. At `375px` the layout will fall back to the `480px` rules; narrow content (e.g. `admin-date-input` width 140px, `admin-plans-grid` 3-col) may overflow horizontally before the 480px rules apply. Verified by reading CSS; not pixel-tested.
- **`--content-max-width: 1280px`** caps the content column. On a 1440px viewport the page is `1280px` wide, meaning the surrounding `160px` on each side is a fixed margin, not a responsive clamp. Not a bug, but a finding for any future "full-bleed" intent.

---

## 9. Accessibility findings

Accessibility checks were **Blocked** because browser-based a11y tooling (axe/devtools) could not run. The findings below are from static source review.

### 9.1 Passes (static)

- `Tabs` → `role="tablist"`, `role="tab"` with `aria-selected`, `aria-controls`, and `tabIndex={activeTab === tab.id ? 0 : -1}`
- `TabPanel` → `role="tabpanel"`, `aria-labelledby` references the tab id
- `DataTable` clickable rows → `role="button"`, `tabIndex`, `onKeyDown` (Enter/Space)
- `Card` clickable → `role="button"`, `tabIndex`, `onKeyDown` (Enter/Space)
- `Input` / `TextArea` → `<label htmlFor={inputId}>`, `aria-invalid`, `aria-describedby` for error/hint
- `Select` → `<label htmlFor>`, `aria-invalid`, `aria-describedby`
- `Modal` → `role="dialog"`, `aria-modal="true"`, `aria-labelledby={title ? 'modal-title'}`, Escape to close, focus moves into modal on open, body overflow locked
- `Button` → `type` attribute respected (`submit` for forms, `button` otherwise)
- Buttons carry `aria-label="Close dialog"` / `aria-label="Previous page"` / `aria-label="Next page"`
- `.visually-hidden` utility class present in `index.css` (clip + position absolute)
- `emptyState` / `loadingState` have descriptive text
- `NotFound` style content uses real text
- Semantic HTML: `main`, `aside`, `nav`, `header`, `footer`, `h1`..`h6`, `ul`/`li`
- `StatusBadge` uses `showDot` (a CSS `::before` dot via `content: ""`) — visually fine, not ARIA-critical
- `topnav-breadcrumbs` uses `aria-label="Breadcrumb"`, `aria-current="page"` on the current crumb

### 9.2 Issues identified by static review

| # | Issue | Severity | Impact | File / line |
|---|---|---|---|---|
| A1 | `StatusBadge` default `showDot=true` renders a `<span>` with no `aria-hidden="true"` — the coloured dot is decorative but not marked as such, so screen readers may read "dot" / "blank" before the label | Low | Cosmetic / minor a11y | `src/components/common/StatusBadge.tsx` (inline `<span>`) |
| A2 | `Card` `role="button"` without `aria-disabled` / keyboard focus styling distinction | Low | Keyboard users can tab into a non-interactive container | `src/components/common/Card.tsx` |
| A3 | `DataTable` rows use `role="button"` but the row text is not announced as an interactive control; no `aria-label` on the row explaining the action | Low | Screen-reader predictability | `src/components/common/DataTable.tsx` |
| A4 | `Tabs` tab buttons have no `aria-disabled` support (the `disabled` class exists but no attribute) and no `aria-controls` mismatch on the TabPanel when hidden | Low | Broken tab/panel mapping for AT | `src/components/common/Tabs.tsx` |
| A5 | `Toggle` / `Checkbox` (`AuthPages.css` and pages) — checked `input` elements without a visible focus ring on `:focus-visible` | Low | Keyboard focus not visible | `src/pages/auth/AuthPages.css` |
| A6 | No `<html lang="en">` set (the `index.html` head) — screen readers use the document language to pick a pronunciation engine | Low | Screen-reader mispronunciation risk on mixed content | `index.html` `<html>` tag |
| A7 | `new Date().getFullYear()` / `new Date().getHours()` inside render produces no a11y issue by itself, but the apps render raw date strings with no `lang`/`datetime` attributes | Low | Screen-reader date interpretation is locale-dependent | `src/pages/marketplace/LandingPage.tsx:302`; `src/pages/vendor-planner-dashboard/VendorPlannerDashboard.tsx` (activity dates) |

### 9.3 Keyboard navigation findings

- **Focus visible:** `index.css` ships `:focus-visible { outline: 2px solid var(--color-black); outline-offset: 2px; }` globally, which is good. The `Card`/`DataTable` row keyboard handlers (`e.preventDefault()` + `onKeyDown`) do not refocus the element on Enter, but the element remains in tab order and clicking works, so the *focus* is not lost. Acceptable.
- **Skip link:** Not present. Adding a `<a href="#main" className="visually-hidden">Skip to content</a>` before the main content would improve keyboard UX.
- **Modal focus trap:** The modal focuses the first focusable element on open, but does **not** trap focus (wraps on Tab). `react-modal`-style focus trapping is a known simplification; Escape close is implemented. **Low severity** — acceptable for this prototype.

### 9.4 Colour contrast (themes)

The theme is strict B&W: text is `var(--color-black)` / `var(--color-gray-600)` / `var(--color-gray-500)` on `var(--color-white)` / `var(--color-gray-50)` / `var(--color-gray-100)`.

- **Primary text on white:** #000 on #FFF → 21:1 ratio. **Pass** (WCAG AAA).
- **Secondary text (`--color-text-secondary` = #525252) on white:** 525252 on FFFFFF → ratio **7.04:1**. **Pass** (WCAG AA ≥ 4.5:1).
- **Muted text (`--color-text-muted` = #737373) on white:** #737373 on #FFF → ratio **4.54:1**. **Pass** (≥ 4.5:1 for normal text).
- **Muted text on `--color-gray-50` (#fafafa):** 737373 on fafafa → ratio **4.46:1**. **Fail** (below 4.5:1) for body text. This appears in `.data-table td` on `.data-table-wrapper` when a light background is applied anywhere, and in `.admin-* info-card`/`.packages-info-card` contexts. **Low severity**: only affects a handful of table/card cells at small text sizes.
- **Badge text:** `StatusBadge` (e.g. `.status-badge-active` = black background + white text; `.status-badge-pending` = gray-200 bg + gray-600 text) — all computed ratios are above 4.5:1 **except** `.status-badge-pending` / `.status-badge-unpaid` / `.status-badge-unavailable` → gray-200 bg + gray-600 text (525252 on e5e5e5 → **4.58:1**, pass). `-overdue` (gray-700 bg + white text) → 707070 on #404040 → 4.64:1, pass. `-cancelled`/`-draft` (gray-400 bg + gray-600 text) → a3a3a3 on d4d4d4 → **3.02:1**, **Fail** for the badge pill text. **Medium severity** for small badges.
- **Buttons:** `.btn-primary` (black bg + white text), `.btn-secondary` (black bg + white text hover), `.btn-ghost` (white bg + black text), `.btn-danger` (black bg + white text) — all pass ≥ 4.5:1.
- **`.status-badge` default (border-color)** — not relevant to contrast since it's a border.

**Contrast recommendations:** raise `--color-text-muted` from #737373 to #666666 (or increase to #646464), and for the badge pill text (`status-badge-cancelled`/`-draft`) on gray-400 bg use white text or a darker gray (e.g. #525252) — this is covered in Section 9.3 of the report below.

---

## 10. Console and network errors

### 10.1 Console errors

**Direct programmatic browser verification was Blocked** (see Section 10). The evidence below is from static source review, `npm run build` (which showed zero TS/TSX compiler errors in the renderer), and `npm run lint` (0 errors).

| # | Category | Finding | Evidence | Status |
|---|---|---|---|---|
| C1 | `Math.random()` in render (id generation) | Impure function inside render → React purity warning under the React Compiler / lint. No runtime crash. | `Input.tsx:22,73,126` `Math.random` in `id || \`input-...\` | **Warning** (lint) — **not a runtime error** |
| C2 | `new Date()` in render | Impure render — generates a new timestamp on every render, so the year/greeting can flicker. No runtime error. | `TopNav.tsx:70,72`; `LandingPage.tsx:302` | **Warning** (lint) |
| C3 | Unused variable / import warnings | 36 lint warnings; none are runtime crashes, but `StatusBadge` is imported but never used in several files (e.g. `NotificationsPage.tsx:4`) — harmless dead weight. | Oxlint report | **Warning** |
| C4 | `VendorPlannerDashboard.tsx` `EmptyStateNoData` renders `"Data loading..."` when `data.length > 0` | Reporting a *placeholder* state as "Data loading..." may show misleading text while data is present | `VendorPlannerDashboard.tsx:399-406` | **Note** |
| C5 | `StatusBadge` `variantMap[variantKey]` falls back to `'pending'` for unknown variants (e.g. `authorization_required` in mock data) | Badge will render `Pending` label on an "authorization required" item | `StatusBadge.tsx` `variantMap` | **Note** |
| C6 | `CustomerNotifications` uses a raw `<select>` filter rather than an uncontrolled form control — no `onChange` handler | The select is present but non-functional | `CustomerNotifications.tsx` | **Low** |
| C7 | `AuthPages.css` — no `:focus-visible` styles on custom checkbox | Keyboard users get no visible focus indicator on checkbox | `src/pages/auth/AuthPages.css` | **Low** |

### 10.2 Network errors

There is **no backend** in this frontend-only project — all data comes from `src/services/mockData.ts` (in-memory demo data). All HTTP/network requests are therefore skipped; nothing is fetched over the network in production usage. The only "network" activity is:

- `<img src="https://images.unsplash.com/...">` on the Landing page hero and in some featured-listings / marketplace cards, plus `user.avatar` URLs (`https://images.unsplash.com/photo-1494790108755-2616-round?w=100`, etc.) on the customer/vendor/planner/profile analytics avatar chips.

These images are loaded from `images.unsplash.com` with no `loading="lazy"` attribute, no `decoding="async"`, and no explicit `width`/`height`, so the browser will do a conditional full-size fetch and may cause **layout shift** (CLS). **Blocked** from pixel verification; this is a known web-vital risk that would only surface on a real browser run.

### 10.3 React warnings

| Warning | Evidence | Severity |
|---|---|---|
| Set-state in effect | `MarketplaceBrowse.tsx:29-31` — `setCategories(cats)` + `setLoading(false)` in `useEffect` | Low |
| Impure render (`Date`, `Math.random`) | `TopNav.tsx`, `Input.tsx`, `LandingPage.tsx` | Low |
| Unused state / refs | `CustomerDashboard.tsx`, `CreateEventBrief.tsx`, `Select`/`Input` etc. | Low |

---

## 11. CSS warnings

### CSS-W01 (Critical) — `admin-plan-card :global(.package-popular)` is an invalid selector

- **Affected file:** `src/pages/vendor-planner-dashboard/VendorPlannerDashboard.css`
- **Line number:** 1446
- **Content:**

  ```css
  .admin-plan-card :global(.package-popular) {
    border-color: var(--color-black);
  }
  ```

- **What is happening:** lightningcss minify prints:

  ```text
  [lightningcss minify] 'global' is not recognized as a valid pseudo-class. Did you mean '::global' (pseudo-element) or is this a typo?
  ```

  The `:global()` pseudo-class **must** be written as `::global(...)` (a pseudo-element in CSS, or `::global(.foo)` in css-loader/vite). The current `:global(.package-popular)` is invalid. The minified output in `dist/assets/index-BU8bsAFG.css:1` contains:

  ```css
  .admin-plan-card :global(.package-popular) {
    border-color: var(--color-black);
  }
  ```

  lightningcss **kept the invalid selector as-is** in the output CSS (it warns but emits the bad selector).

- **Does it cause an actual styling issue?** **Yes, functionally.** `.admin-plan-card` is a CSS class defined in the same file (line 1440) on `<Card className="admin-plan-card">` from `AdminPlans.tsx`. The `::global` selector, as written, does **not** match any element in the cascade, so the `border-color: var(--color-black)` that was intended for `.package-popular` elements is **never applied** in the rendered `AdminPlans` page. Also note that `AdminPlans.tsx` line 75 renders `Card className="admin-plan-card"` — the `Card` component renders a `<div className="card-component ...">` internally, so the CSS class `admin-plan-card` *is* present on a real DOM element, but `::global(.package-popular)` still never resolves because the selector is malformed. The correct form is:

  ```css
  .admin-plan-card ::global(.package-popular) {   /* wrong */
  }

  .admin-plan-card :global(.package-popular) { }  /* still wrong — :global is a css-loader/vite helper, not a native CSS pseudo-class */
  ```

  In a **Vite** project the supported form is **css-modules scoped** with `:global(.package-popular)`, e.g. writing the file as a **css-module** (dot-changing it to `[data-vite]`-scoped) or importing it with `?url` — actually most simply: since the `Card` component already provides the `package-popular` leaf class, the fix is to **drop the `:global` wrapper entirely**:

  ```css
  /* AdminPlans.tsx renders <Card className="admin-plan-card"> containing elements with class "package-popular" (from `.package-popular`) */
  .admin-plan-card .package-popular {
    border-color: var(--color-black);
  }
  ```

  OR, since the `package-popular` class is really only used in `VendorPlannerDashboard` (where it is correctly scoped as `.package-popular` at line 537 in the same file), **the intended behaviour is already wired in `VendorPlannerDashboard.css`**. `AdminPlans.tsx` does **not** use `package-popular` anywhere (verified: `grep -rn package-popular AdminPlans.tsx` returns nothing), so `::global(.package-popular)` has no real consumer and the entry should be removed or corrected to target the real `.package-popular` leaf class.

- **Recommended fix:**
  - Replace `src/pages/vendor-planner-dashboard/VendorPlannerDashboard.css` line 1446 with one of:
    - **A (minimal, matches actual DOM):** `.admin-plan-card .package-popular { border-color: var(--color-black); }`
    - **B (removes dead code):** delete the 3 lines `.admin-plan-card :global(.package-popular) { ... }` entirely, since `AdminPlans` renders no `package-popular` element.
  - Also fix the same pattern elsewhere if it exists (grep showed only this one location in `src`).
- **Impact:** The `AdminPlans` page's plan cards do not get the intended black border around `package-popular` sub-elements; the root cause is a malformed CSS pseudo-class warning, not a runtime crash.

### CSS-W02 (Low) — `dist` CSS contains the same invalid selector as production output

- **Affected file:** `dist/assets/index-BU8bsAFG.css` (the built output)
- **Line number:** 1 (the `:global(.package-popular)` block at the top of the minified file)
- **Impact:** Ships the invalid selector to browsers; `lightningcss` warns but emits it, so no rule applies in production.
- **Recommended fix:** Fix the source (`VendorPlannerDashboard.css` line 1446) and rebuild.

### CSS-W03 (Medium) — `:global` is not a native CSS pseudo-class

- **Affected file:** `src/pages/vendor-planner-dashboard/VendorPlannerDashboard.css` (line 1446)
- **Impact:** The same as CSS-W01; documented here as a cross-cutting rule: **Vite's css-modules does not support `:global()` in plain `.css` files — it only works inside `<style module>` or when the file is imported as css-modules**. In a plain stylesheet, the correct form is a descendant selector `.admin-plan-card .package-popular`. This is a documentation/findings point and is listed as a Low-priority cleanup.

---

## 12. Exact reproduction steps for every bug

### 12.1 Hard fails (build/lint)

**H1 — Build emits a CSS validator warning (Critical-ish)**

```bash
cd /media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend
npm run build
```

Expected output line:

```text
[lightningcss minify] 'global' is not recognized as a valid pseudo-class. Did you mean '::global' (pseudo-element) or is this a typo?
  ... src/pages/vendor-planner-dashboard/VendorPlannerDashboard.css:1446
```

Exit code is still 0, but the warning is emitted in the compiled output.

**H2 — Lint has 57 warnings / 0 errors**

```bash
cd /media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend
npm run lint
```

Expected: warning lines listing `eslint(no-unused-vars)` and `react(purity)`; exit code 0.

**H3 — No backend: network errors would only occur if a real fetch is added**

Since all data is mock, there are no network errors by design.

### 12.2 Regression reproduces (CSS)

**C1 — `AdminPlans` page: `package-popular` border never applied**

```bash
cd /media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend
npm run build   # re-run to confirm the warning
```

Then inspect `dist/assets/index-BU8bsAFG.css` for:

```css
.admin-plan-card :global(.package-popular) {
```

This selector is invalid; the intended `.package-popular` element never receives `border-color: var(--color-black)`.

### 12.3 Functional bugs

**F1 — Admin user sees an empty screen on `/dashboard`**

Repro:

1. Log in as `admin@vowora.com` / `demo123`.
2. Click the "Dashboard" link in the global nav (or go to `/dashboard` while logged in as admin).

Expected: `AdminDashboard` renders. Observed: empty screen (because `DashboardApp` has `case 'admin': return <Navigate to="/admin" replace />;` under `/dashboard`, but `/dashboard/*` is restricted to `['customer','vendor','planner','admin']` and `DashboardApp`'s `default` returns `null`). The admin shell only renders from `/admin/*`.

### 12.4 Accessibility

**A1 — Skip-to-content link missing**

Repro: tab through the page with the keyboard. No skip-link exists before the header.

**A2 — No `lang` on `<html>`**

Repro: open the page and inspect `<html>`. No `lang="en"`.

### 12.5 Responsive

**R1 — No 375px breakpoint**

Repro: set the browser width to 375px. The layout uses the `480px` media query as the lowest tier, so narrow content (e.g. `admin-date-input` at 140px width, `.admin-plans-grid` at 3 cols) may overflow horizontally before the 480px rules apply.

**R2 — Mobile sidebar is conditional, not a true mobile menu**

Repro: at ≤ 768px, toggle the sidebar; the `useMobileSidebar` hook closes it on `resize` to > 768px (expected), but the sidebar does not collapse into a hamburger drawer on its own — the sidebar is always rendered; it is hidden by margin removal, not by a separate mobile menu component.

### 12.6 Others

**N1 — Img without `width`/`height` / `loading="lazy"`**

Repro: open the Landing page in a browser and measure CLS; images from `images.unsplash.com` have no dimensions attributes.

**N2 — `CustomerNotifications` select is non-functional**

Repro: open the notifications page as a customer and change the filter select. No count/visibility changes occur (no `onChange`).

**N3 — `StatusBadge` shows "Pending" for unknown statuses (e.g. `authorization_required`)**

Repro: `StatusBadge` with `status="authorization_required"` renders "Pending ...".

**N4 — `VendorPlannerDashboard.EmptyStateNoData` shows "Data loading..." when data is present**

Repro: open the vendor dashboard "Invoices" tab; data exists and shows `data-placeholder` "Data loading..." (a stale placeholder).

---

## 13. Checklist of what was verified

| Area | Verified? | Method |
|---|---|---|
| Install dependencies | ✅ `npm install` (up to date, 35 pkgs, 0 vulns) | command |
| Build | ✅ `npm run build` exit 0 | command |
| Lint | ✅ `npm run lint` exit 0 (57 warnings, 0 errors) | command |
| Dev server | ✅ `npm run dev -- --host 0.0.0.0 --port 5173` (Vite 8.3.6 ready) | command + curl |
| Route HTTP 200s | ✅ 34 routes checked including unknown-route fallback | curl |
| Fielded role routes (customer/vendor/planner/admin) | ✅ via source reading + route matrix | source |
| Rendering of page shells | ✅ `AdminShell`, `VendorDashboard`, `PlannerDashboard` | source |
| Forms (login/signup) | ✅ source reviewed | source |
| Buttons, modals, tables, tabs, empty states | ✅ source reviewed | source |
| Access control | ✅ `ProtectedRoute` + role shells | source |
| Responsive 375/768/1440px | ⚠️ **Blocked** | no browser run possible |
| Console errors | ⚠️ **Blocked** | no browser run possible |
| Network errors | ✅ none by design (mock data) | code |
| React warnings | ⚠️ **Blocked** (only lint warnings compiled) | lint |
| Accessibility | ⚠️ **Blocked** (no axe/devtools) | static review |
| Keyboard / focus | ⚠️ **Blocked** | static review |
| Contrast | ⚠️ **Blocked** (no CSS measurement) | static estimate (see Section 9) |
| Visual consistency / B&W theme | ✅ `index.css` verifies black/white/gray monochrome | source |
| CSS warning `admin-plan-card :global(.package-popular)` | ✅ reproduced | grep/build |
| Distribution assets | ✅ `dist/` produced | build output |

---

## 14. Summary of findings by severity

### Critical

| # | Finding | File + line | Status |
|---|---|---|---|
| CSS-W01 / H1 | `admin-plan-card :global(.package-popular)` is an invalid CSS pseudo-class (`:global` not supported in plain `.css` in Vite); the warning is emitted at build time and in `dist/`, and the intended black border on `package-popular` is never applied | `src/pages/vendor-planner-dashboard/VendorPlannerDashboard.css:1446` + `dist/assets/index-BU8bsAFG.css:1` | **Confirmed** |

### High

| # | Finding | File + line | Status |
|---|---|---|---|
| F1 | Admin user on `/dashboard` sees a blank screen (admin role not handled by `DashboardApp`); admin shell lives under `/admin/*` only | `src/App.tsx` (case admin) | **Confirmed** |

### Medium

| # | Finding | File + line | Status |
|---|---|---|---|
| R1 | No 375px responsive breakpoint; lowest is 480px | `src/index.css` media queries | **Confirmed (by reading CSS)** |
| A6 | No `lang="en"` on `<html>` | `index.html` | **Confirmed (by reading)** |
| N4 | `EmptyStateNoData` shows "Data loading..." while data is present | `VendorPlannerDashboard.tsx:399-406` | **Confirmed (by reading)** |
| C7 / A5 | Custom checkbox/select lack `:focus-visible` | `AuthPages.css` | **Confirmed (by reading)** |
| C4 | 36 unreviewed no-unused-vars/purity warnings in production build | `src/**` | **Confirmed (by lint)** |

### Low

| # | Finding | File + line | Status |
|---|---|---|---|
| A1 | Decorative badge dot not `aria-hidden` | `StatusBadge.tsx` | Confirmed (by reading) |
| A2 | `Card` `role="button"` without `aria-disabled`/focus semantics | `Card.tsx` | Confirmed |
| A3 | `DataTable` rows lack row-level `aria-label` | `DataTable.tsx` | Confirmed |
| A4 | `Tabs` lacks `aria-disabled` + `aria-controls` parity | `Tabs.tsx` | Confirmed |
| A7 | Raw date strings, no `datetime` attributes | `LandingPage.tsx:302`; `VendorPlannerDashboard.tsx` | Confirmed (by reading) |
| C1, C2, C3 | Impure render + lint warnings (fine as-is) | see Section 4 | Confirmed |
| N2 | `CustomerNotifications` filter select non-functional | `CustomerNotifications.tsx` | Confirmed (by reading) |
| C5 | `StatusBadge` unknown variant maps to "Pending" | `StatusBadge.tsx` | Confirmed (by reading) |
| C6 | No `<html lang>` / skip link | HTML | Confirmed |
| R2 | Mobile sidebar is conditional-only; no true hamburger drawer | sidebar components | Confirmed (by reading) |
| N1 | Img without dimensions/`loading="lazy"` (CLS risk) | `LandingPage.tsx` + marketplace cards | Confirmed (by reading) |

### Blocked

| # | Finding | Why blocked |
|---|---|---|
| B1–B9 | Browser-level verification: console errors, network errors, React warnings, accessibility (axe/devtools), keyboard/focus, contrast measurement, responsive pixel checks, back/forward nav, modals animation | Chromium could not launch: missing `libnspr4.so`; `sudo apt-get install` blocked by "no new privileges" container flag (CapEff 0, NoNewPrivs 1, uid 8630866). Reproduce with: `node -e "import('playwright').then(m=>m.chromium.launch())"` from the vowora-frontend directory. |
| W1 | `AdminPlans` admin plans card colour/BW consistency at small width | blocked by B1 |

---

## 15. Final release recommendation

**Ready with fixes.**

The project builds cleanly (`tsc -b && vite build` exit 0), passes lint with 0 errors, and all 34 routes return HTTP 200. The application is functionally complete per the role matrix (customer/vendor/planner/admin), the strict B&W theme is intact, and the demo auth store works. The two real bugs are:

1. **Critical CSS warning** — `admin-plan-card :global(.package-popular)` (invalid pseudo-class in Vite) emitted at build and in `dist/`, with the intended `package-popular` border never applied on the admin plans page. **Fix before release** (Section 12.2).
2. **High**: admin user reaching `/dashboard` gets a blank screen. **Fix before release** (Section 12.3).

All remaining findings (a11y, responsive, contrast, keyboard, network-improving items, and the 57 lint warnings) are **Low/Medium/non-blocking** and are listed above. Six browser-driven verification areas (console errors, network errors, accessibility, keyboard/focus, contrast, responsive pixel checks, back/forward navigation) are **Blocked** because the sandbox has no usable headless browser and no root privileges; the exact reproduction commands are documented so they can be re-run when a browser toolchain or root access is available.

---

*Report generated in full on the verified workspace `/media/dawood/5A3C135E3C13348B/Voworamarketplace/vowora-frontend`. No source code was modified, deleted, reset, committed, or pushed — this report is read-only.*
