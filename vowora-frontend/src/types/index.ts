export type Role = 'customer' | 'vendor' | 'planner' | 'admin';

export type SubscriptionPlan = 'silver' | 'gold' | 'diamond';

export type EventStatus =
  | 'draft'
  | 'submitted'
  | 'planner_assigned'
  | 'shortlist_ready'
  | 'proposal_received'
  | 'proposal_approved'
  | 'booking_confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type RequestStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'countered'
  | 'withdrawn';

export type QuoteStatus =
  | 'draft'
  | 'submitted'
  | 'viewed'
  | 'accepted'
  | 'rejected'
  | 'countered';

export type ProposalStatus =
  | 'draft'
  | 'submitted'
  | 'viewed'
  | 'approved'
  | 'rejected'
  | 'revision_requested';

export type InvoiceStatus =
  | 'draft'
  | 'issued'
  | 'paid'
  | 'overdue'
  | 'cancelled';

export type PaymentStatus =
  | 'unpaid'
  | 'reported'
  | 'evidence_attached'
  | 'platform_recorded'
  | 'disputed'
  | 'refunded';

export type AvailabilityStatus = 'available' | 'booked' | 'unavailable';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CustomerProfile {
  userId: string;
  company?: string;
  address?: string;
  city?: string;
  country?: string;
  bio?: string;
  preferences?: string[];
}

export interface VendorProfile {
  userId: string;
  companyName: string;
  tagline?: string;
  description: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  yearsOfExperience: number;
  serviceArea: string[];
  isVerified: boolean;
  responseTime: string;
  awardedCount: number;
  completedCount: number;
  cancellationRate: number;
  brandingTier: 'basic' | 'moderate' | 'advanced';
  portfolioCount: number;
  packageCount: number;
  teamMemberCount: number;
}

export interface PlannerProfile {
  userId: string;
  companyName?: string;
  title?: string;
  description: string;
  specialties: string[];
  serviceArea: string[];
  yearsOfExperience: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  portfolioCount: number;
  assignedEventCount: number;
  completedEventCount: number;
  brandingTier: 'basic' | 'moderate' | 'advanced';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parentId?: string;
  listingCount: number;
}

export interface Listing {
  id: string;
  vendorId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: string;
}

export interface Package {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  inclusions: string[];
  exclusions: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
}

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  category: string;
  basePrice?: number;
  currency?: string;
  duration: string;
  isAvailable: boolean;
}

export interface AvailabilitySlot {
  id: string;
  vendorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AvailabilityStatus;
  maxBookings?: number;
  currentBookings?: number;
}

export interface Event {
  id: string;
  customerId: string;
  customerName: string;
  eventName: string;
  description: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  country: string;
  guestCount: number;
  budget: number;
  currency: string;
  status: EventStatus;
  plannerId?: string;
  plannerName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorRequest {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  vendorId: string;
  vendorName: string;
  customerId: string;
  customerName: string;
  status: RequestStatus;
  requestType: string;
  message?: string;
  responseDeadline: string;
  createdAt: string;
}

export interface QuoteVersion {
  id: string;
  requestId: string;
  vendorId: string;
  vendorName: string;
  version: number;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  validUntil: string;
  status: QuoteStatus;
  notes?: string;
  createdAt: string;
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Proposal {
  id: string;
  eventId: string;
  eventName: string;
  customerId: string;
  customerName: string;
  plannerId?: string;
  plannerName?: string;
  vendorIds: string[];
  vendorNames: string[];
  items: ProposalItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  validUntil: string;
  status: ProposalStatus;
  notes?: string;
  createdAt: string;
}

export interface ProposalItem {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Shortlist {
  id: string;
  eventId: string;
  eventName: string;
  customerId: string;
  vendorCount: number;
  status: 'draft' | 'shared' | 'finalized';
  createdAt: string;
}

export interface Booking {
  id: string;
  eventId: string;
  eventName: string;
  customerId: string;
  customerName: string;
  vendorId?: string;
  vendorName?: string;
  plannerId?: string;
  plannerName?: string;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  bookingId?: string;
  eventId: string;
  eventName: string;
  invoiceNumber: string;
  issuerId: string;
  issuerName: string;
  payerId: string;
  payerName: string;
  payeeId: string;
  payeeName: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;
  dueDate: string;
  fileReference?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  referenceId?: string;
  referenceType?: string;
  createdAt: string;
}

export interface PlanEntitlement {
  plan: SubscriptionPlan;
  maxPortfolioImages: number | 'unlimited';
  maxPackages: number | 'unlimited';
  maxTeamMembers: number;
  maxAssignedEvents: number;
  maxIncomingRequests?: number | 'unlimited';
  crmAccess: boolean;
  n8nAccess: boolean;
  n8nTemplateLevel: SubscriptionPlan;
  analyticsTier: 'basic' | 'advanced' | 'full';
  searchVisibility: 'normal' | 'improved' | 'priority';
  customBranding: 'basic' | 'moderate' | 'advanced';
  prioritySupport: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  vendorId?: string;
  plannerId?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  joinedAt: string;
}

export interface MediaAsset {
  id: string;
  ownerId: string;
  ownerType: 'vendor' | 'planner';
  fileUrl: string;
  fileType: string;
  fileName: string;
  fileSize: number;
  thumbnailUrl?: string;
  altText?: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  currency: string;
  activeBookings: number;
  completedEvents: number;
  pendingRequests: number;
  averageRating: number;
  reviewCount: number;
  conversionRate: number;
  monthlyTrend: { month: string; value: number }[];
}

export interface AuditEvent {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  resourceName: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface UserProfile {
  user: User;
  customerProfile?: CustomerProfile;
  vendorProfile?: VendorProfile;
  plannerProfile?: PlannerProfile;
  subscription?: Subscription;
}

export interface CRMContact {
  id: string;
  ownerId: string;
  ownerType: 'vendor' | 'planner';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  lastContacted?: string;
  leadSource: string;
  status: 'lead' | 'opportunity' | 'customer' | 'inactive';
  notes?: string;
  createdAt: string;
}
