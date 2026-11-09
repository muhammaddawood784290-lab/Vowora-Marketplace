# Vowora Review and Rating Flow

## Overview

Customers and providers give feedback on events, proposals, and interactions.

## Flow

1. An event completes.
2. The customer can submit a review and rating.
3. The provider can respond to the review.
4. The review is visible on the provider profile.
5. Ratings aggregate into an average rating.

## Data

- Review stores event reference, reviewer, reviewer role, provider, rating, text, and timestamps.
- Ratings are retained per country and per device.

## Security

- Reviews are scoped to the event.
- Users cannot review their own events.
- Spam and fake reviews are filtered.

## Moderation

- Reviews can be flagged.
- Admins review and remove inappropriate content.
- All moderation actions are audit-recorded.
