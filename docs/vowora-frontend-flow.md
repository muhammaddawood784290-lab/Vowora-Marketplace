# Vowora Frontend Flow

## Overview

The frontend flow describes the user interactions that drive the application.

## Routes and flows

| Route | Flow | Status |
| --- | --- | --- |
| `/` | Landing page, marketplace browse | Implemented |
| `/marketplace` | Public browse | Implemented |
| `/marketplace/category/:slug` | Category browse | Implemented |
| `/login` | Login | Implemented |
| `/signup` | Signup | Implemented |
| `/dashboard/*` | Role dashboard | Implemented |
| `/admin/*` | Admin shell | Implemented |

## Role flows

### Customer

- Browse marketplace → create brief → assign planner → shortlist vendors → review proposal → approve → booking → invoices → complete event.

### Vendor

- Create profile → add services, packages, rates, availability → receive requests → respond → submit quotes → issue invoices → manage business.

### Planner

- Assign event → review brief → build shortlist → compare quotes → create proposal → approval → booking → tracking.

### Admin

- Configure plans, categories, verification, assignments, disputes, subscriptions, audit review.

## Status

- **Implemented** — routing, auth, mock data.
- **Partially implemented** — real backend integration.
- **Blocked** — production API integration.
