# Vowora Planner Flow

## Overview

The planner flow covers how a coordinator handles event briefs, shortlists, vendor coordination, quote comparison, consolidated proposals, and booking tracking.

## Flow steps

### 1. Assignment

- Planner receives an event assignment from a customer.
- Planner accepts, rejects, or requests information.

### 2. Event review

- Planner reviews the customer brief, budget, required categories, and event constraints.

### 3. Shortlist management

- Planner builds and manages shortlists.
- Customer may suggest vendors or the planner may discover vendors.
- Planner adds, recommends, or replaces vendors with a reason.

### 4. Quote comparison

- Planner compares vendor quotations while preserving each vendor version.
- Planner tracks quote status and availability.

### 5. Proposal

- Planner creates a consolidated proposal with line items, organizer fee, terms, and validity.
- Proposal references source quote versions.

### 6. Customer approval

- Customer reviews and approves, requests changes, or rejects the proposal.

### 7. Booking

- After approval, booking is confirmed.
- Planner tracks the booking and event status.

### 8. Tracking and CRM

- Planner tracks bookings and customer interactions.
- Planner uses CRM to manage relationships and opportunities.

## Status transitions

| From | To | Trigger |
| --- | --- | --- |
| Assigned | Active | Planner accepts. |
| Active | Rejected | Planner rejects. |
| Shortlist ready | Proposal received | Proposal sent. |
| Proposal received | Proposal approved | Customer approves. |
| Booking confirmed | In progress | Event starts. |
| Any active | Cancelled | Planner or customer cancels. |

## Constraints

- Final vendor set cannot be booked until customer approves the proposal.
- Submitted quotes and approved proposals are immutable.
- Planner access is scoped to assigned events and own CRM.

## Security

- Planner access is scoped to own assigned events and CRM.
- Admin access is required for configuration and audit review.
- Audit events record every workflow transition.
