# Vowora Customer Flow

## Overview

The customer flow covers how a user plans an event from discovery through to completion. The customer is the central coordinator of an event and interacts with planners and vendors.

## Flow steps

### 1. Discovery

- Browse the public marketplace.
- Search by category, location, budget, or keyword.
- View public listings, packages, and provider profiles.

### 2. Account creation

- Sign up as a free customer.
- Complete profile, preferences, and event requirements.

### 3. Event brief

- Create an event with type, date, timezone, location, guest count, budget, required categories, notes, and attachments.
- The event can be created with or without vendors.

### 4. Planner selection or assignment

- Select a planner, suggest one, or request platform assignment.
- Manual assignment: an admin or planner is assigned with a reason.
- Automatic assignment: assignment follows configured rules.
- Both paths create the same auditable assignment record.

### 5. Shortlist

- Browse vendors and public packages/prices.
- Shortlist preferred vendors.
- Accept or request changes to the organizer shortlist.

### 6. Proposal

- The organizer consolidates vendor quotations into a proposal.
- The proposal includes line items, organizer fee, terms, and validity.
- The customer reviews and approves, requests changes, or rejects.

### 7. Booking

- After approval, the booking is confirmed.
- The customer views booking details, amounts, and payment instructions.

### 8. Tracking and payment

- Track status and evidence.
- Vendor or planner records payment status and evidence.
- Payment status is labeled reported, evidence-attached, or platform-recorded.

### 9. Completion

- Event closes.
- Invoices, status, and evidence are retained for the record.

## Exceptions

- Customer can cancel an event at any stage.
- Vendor or planner can withdraw a response only for defined reasons.
- Proposal can be revised multiple times before final approval.

## Status transitions

| From | To | Trigger |
| --- | --- | --- |
| Draft | Submitted | Customer submits brief. |
| Submitted | Planner assigned | Planner assigned. |
| Planner assigned | Shortlist ready | Customer approves shortlist. |
| Shortlist ready | Proposal received | Organizer sends proposal. |
| Proposal received | Proposal approved | Customer approves. |
| Proposal approved | Booking confirmed | Booking confirmed. |
| Booking confirmed | In progress | Event starts. |
| Any active | Cancelled | Customer, planner, or vendor cancels. |

## Edge cases

- Planner assignment requested but manual assignment is pending.
- Vendor requests a counteroffer; organizer must re-shortlist.
- Proposal revised and customer re-approved.
- Invoice uploaded without payment evidence.
