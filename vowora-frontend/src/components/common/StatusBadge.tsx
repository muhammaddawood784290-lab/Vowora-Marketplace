import React from 'react';

type StatusVariant =
  | 'pending'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'draft'
  | 'accepted'
  | 'rejected'
  | 'paid'
  | 'unpaid'
  | 'issued'
  | 'overdue'
  | 'viewed'
  | 'submitted'
  | 'approved'
  | 'revision_requested'
  | 'countered'
  | 'shared'
  | 'finalized'
  | 'confirmed'
  | 'in_progress'
  | 'booked'
  | 'available'
  | 'unavailable'
  | 'verified'
  | 'unverified';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

const variantMap: Record<StatusVariant, string> = {
  pending: 'pending',
  active: 'active',
  completed: 'completed',
  cancelled: 'cancelled',
  draft: 'draft',
  accepted: 'accepted',
  rejected: 'rejected',
  paid: 'paid',
  unpaid: 'unpaid',
  issued: 'issued',
  overdue: 'cancelled',
  viewed: 'viewed',
  submitted: 'submitted',
  approved: 'accepted',
  revision_requested: 'revision_requested',
  countered: 'countered',
  shared: 'shared',
  finalized: 'finalized',
  confirmed: 'confirmed',
  in_progress: 'in_progress',
  booked: 'booked',
  available: 'available',
  unavailable: 'unavailable',
  verified: 'accepted',
  unverified: 'rejected',
};

const statusLabelMap: Record<string, string> = {
  pending: 'Pending',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
  draft: 'Draft',
  accepted: 'Accepted',
  rejected: 'Rejected',
  paid: 'Paid',
  unpaid: 'Unpaid',
  issued: 'Issued',
  overdue: 'Overdue',
  viewed: 'Viewed',
  submitted: 'Submitted',
  approved: 'Approved',
  revision_requested: 'Revision Requested',
  countered: 'Countered',
  shared: 'Shared',
  finalized: 'Finalized',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  booked: 'Booked',
  available: 'Available',
  unavailable: 'Unavailable',
  verified: 'Verified',
  unverified: 'Unverified',
  proposal_received: 'Proposal Received',
  shortlist_ready: 'Shortlist Ready',
  planner_assigned: 'Planner Assigned',
  booking_confirmed: 'Booking Confirmed',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant,
  size = 'md',
  showDot = true,
}) => {
  const normalizedStatus = status?.toLowerCase().replace(/_/g, ' ') || 'unknown';
  const variantKey = variant || (status?.toLowerCase() as StatusVariant) || 'pending';
  const label = statusLabelMap[status?.toLowerCase()] || normalizedStatus;

  return (
    <span
      className={`status-badge status-badge-${size} status-badge-${variantMap[variantKey] || 'pending'}`}
      style={{
        background: getBadgeBg(variantKey),
        color: getBadgeColor(variantKey),
      }}
    >
      {showDot && <span></span>}
      {label}
    </span>
  );
};

function getBadgeBg(variant: string): string {
  switch (variant) {
    case 'pending':
    case 'unpaid':
    case 'unavailable':
    case 'draft':
    case 'viewed':
    case 'cancelled':
    case 'rejected':
    case 'unverified':
      return 'var(--color-gray-200)';
    case 'active':
    case 'accepted':
    case 'paid':
    case 'submitted':
    case 'approved':
    case 'confirmed':
    case 'in_progress':
    case 'booked':
    case 'available':
    case 'issued':
    case 'verified':
      return 'var(--color-black)';
    case 'completed':
    case 'shared':
    case 'finalized':
    case 'overdue':
      return 'var(--color-gray-700)';
    case 'revision_requested':
    case 'countered':
      return 'var(--color-gray-400)';
    default:
      return 'var(--color-gray-200)';
  }
}

function getBadgeColor(variant: string): string {
  switch (variant) {
    case 'pending':
    case 'unpaid':
    case 'unavailable':
    case 'draft':
    case 'viewed':
    case 'cancelled':
    case 'rejected':
    case 'unverified':
      return 'var(--color-gray-600)';
    case 'active':
    case 'accepted':
    case 'paid':
    case 'submitted':
    case 'approved':
    case 'confirmed':
    case 'in_progress':
    case 'booked':
    case 'available':
    case 'issued':
    case 'verified':
      return 'var(--color-white)';
    case 'completed':
    case 'shared':
    case 'finalized':
    case 'overdue':
      return 'var(--color-white)';
    case 'revision_requested':
    case 'countered':
      return 'var(--color-black)';
    default:
      return 'var(--color-gray-600)';
  }
}

export default StatusBadge;
