import type {
  User,
  CustomerProfile,
  VendorProfile,
  PlannerProfile,
  Category,
  Listing,
  Package,
  Service,
  AvailabilitySlot,
  Event,
  VendorRequest,
  QuoteVersion,
  Proposal,
  Shortlist,
  Booking,
  Invoice,
  Notification,
  Subscription,
  TeamMember,
  MediaAsset,
  AnalyticsSummary,
  AuditEvent,
  UserProfile,
  CRMContact,
} from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

class ApiService {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    // When API is not connected, return mock data
    if (import.meta.env.VITE_API_CONNECTED !== 'true') {
      return this.getMockData(endpoint, options);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiError(
        error.message || response.statusText,
        response.status
      );
    }

    return response.json();
  }

  private getMockData<T>(
    endpoint: string,
    options: RequestInit
  ): T | Promise<T> {
    const method = options.method || 'GET';
    const url = new URL(endpoint, BASE_URL);
    const path = url.pathname;

    // Return empty array or object for mock data
    return [] as T;
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    return this.request<UserProfile>(`/users/${userId}/profile`);
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/users/me');
  }

  async updateUserProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async updateCustomerProfile(data: Partial<CustomerProfile>): Promise<CustomerProfile> {
    return this.request<CustomerProfile>('/users/me/customer-profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async updateVendorProfile(data: Partial<VendorProfile>): Promise<VendorProfile> {
    return this.request<VendorProfile>('/users/me/vendor-profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async updatePlannerProfile(data: Partial<PlannerProfile>): Promise<PlannerProfile> {
    return this.request<PlannerProfile>('/users/me/planner-profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/marketplace/categories');
  }

  async getCategorySlug(slug: string): Promise<Category> {
    return this.request<Category>(`/marketplace/categories/${slug}`);
  }

  async getListings({
    categoryId,
    search,
    page = 1,
    pageSize = 12,
    featured,
    vendorId,
  }: {
    categoryId?: string;
    search?: string;
    page?: number;
    pageSize?: number;
    featured?: boolean;
    vendorId?: string;
  } = {}): Promise<{ listings: Listing[]; total: number; page: number }> {
    return this.request<{ listings: Listing[]; total: number; page: number }>(
      '/marketplace/listings',
      {
        method: 'POST',
        body: JSON.stringify({ categoryId, search, page, pageSize, featured, vendorId }),
      }
    );
  }

  async getListing(listingId: string): Promise<Listing> {
    return this.request<Listing>(`/marketplace/listings/${listingId}`);
  }

  async getVendorProfile(vendorId: string): Promise<VendorProfile & { user: User }> {
    return this.request<VendorProfile & { user: User }>(`/marketplace/vendors/${vendorId}`);
  }

  async getPlannerProfile(plannerId: string): Promise<PlannerProfile & { user: User }> {
    return this.request<PlannerProfile & { user: User }>(`/marketplace/planners/${plannerId}`);
  }

  async getPackages(vendorId: string): Promise<Package[]> {
    return this.request<Package[]>(`/marketplace/vendors/${vendorId}/packages`);
  }

  async getServices(vendorId: string): Promise<Service[]> {
    return this.request<Service[]>(`/marketplace/vendors/${vendorId}/services`);
  }

  async createEvent(data: Partial<Event>): Promise<Event> {
    return this.request<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getEvents(filters?: {
    status?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ events: Event[]; total: number }> {
    return this.request<{ events: Event[]; total: number }>('/events', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getEvent(eventId: string): Promise<Event> {
    return this.request<Event>(`/events/${eventId}`);
  }

  async updateEvent(eventId: string, data: Partial<Event>): Promise<Event> {
    return this.request<Event>(`/events/${eventId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async requestPlanner(eventId: string, plannerId: string): Promise<Event> {
    return this.request<Event>(`/events/${eventId}/request-planner`, {
      method: 'POST',
      body: JSON.stringify({ plannerId }),
    });
  }

  async getVendorRequests(filters?: {
    status?: string;
    page?: number;
  }): Promise<{ requests: VendorRequest[]; total: number }> {
    return this.request<{ requests: VendorRequest[]; total: number }>('/vendor-requests', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getVendorRequest(requestId: string): Promise<VendorRequest> {
    return this.request<VendorRequest>(`/vendor-requests/${requestId}`);
  }

  async respondToRequest(requestId: string, data: { status: string; message?: string }): Promise<VendorRequest> {
    return this.request<VendorRequest>(`/vendor-requests/${requestId}/respond`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getShortlists(): Promise<Shortlist[]> {
    return this.request<Shortlist[]>('/shortlists');
  }

  async getShortlist(shortlistId: string): Promise<Shortlist> {
    return this.request<Shortlist>(`/shortlists/${shortlistId}`);
  }

  async createShortlist(data: Partial<Shortlist>): Promise<Shortlist> {
    return this.request<Shortlist>('/shortlists', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getQuotes(filters?: { status?: string; page?: number }): Promise<{ quotes: QuoteVersion[]; total: number }> {
    return this.request<{ quotes: QuoteVersion[]; total: number }>('/quotes', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getQuote(quoteId: string): Promise<QuoteVersion> {
    return this.request<QuoteVersion>(`/quotes/${quoteId}`);
  }

  async createQuote(requestId: string, data: Partial<QuoteVersion>): Promise<QuoteVersion> {
    return this.request<QuoteVersion>(`/quotes`, {
      method: 'POST',
      body: JSON.stringify({ requestId, ...data }),
    });
  }

  async getProposals(filters?: { status?: string }): Promise<Proposal[]> {
    return this.request<Proposal[]>('/proposals', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getProposal(proposalId: string): Promise<Proposal> {
    return this.request<Proposal>(`/proposals/${proposalId}`);
  }

  async createProposal(data: Partial<Proposal>): Promise<Proposal> {
    return this.request<Proposal>('/proposals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBookings(filters?: { status?: string }): Promise<Booking[]> {
    return this.request<Booking[]>('/bookings', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getInvoices(filters?: { status?: string }): Promise<Invoice[]> {
    return this.request<Invoice[]>('/invoices', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getNotifications(params?: { unreadOnly?: boolean }): Promise<Notification[]> {
    return this.request<Notification[]>('/notifications', {
      method: 'POST',
      body: JSON.stringify(params || {}),
    });
  }

  async markNotificationRead(notificationId: string): Promise<void> {
    await this.request<void>(`/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  }

  async getSubscription(): Promise<Subscription> {
    return this.request<Subscription>('/subscriptions/me');
  }

  async updatePlan(data: { plan: string }): Promise<Subscription> {
    return this.request<Subscription>('/subscriptions/plan', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAnalytics(): Promise<AnalyticsSummary> {
    return this.request<AnalyticsSummary>('/analytics/summary');
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return this.request<TeamMember[]>('/team-members');
  }

  async addTeamMember(data: Partial<TeamMember>): Promise<TeamMember> {
    return this.request<TeamMember>('/team-members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async removeTeamMember(memberId: string): Promise<void> {
    await this.request<void>(`/team-members/${memberId}`, {
      method: 'DELETE',
    });
  }

  async getCRMContacts(filters?: { status?: string }): Promise<CRMContact[]> {
    return this.request<CRMContact[]>('/crm/contacts', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async createCRMContact(data: Partial<CRMContact>): Promise<CRMContact> {
    return this.request<CRMContact>('/crm/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMediaAssets(): Promise<MediaAsset[]> {
    return this.request<MediaAsset[]>('/files/assets');
  }

  async getAvailability(vendorId: string): Promise<AvailabilitySlot[]> {
    return this.request<AvailabilitySlot[]>(`/availability/${vendorId}`);
  }

  async updateAvailability(data: Partial<AvailabilitySlot>): Promise<AvailabilitySlot[]> {
    return this.request<AvailabilitySlot[]>('/availability', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getAdminUsers(filters?: { role?: string; page?: number }): Promise<{ users: User[]; total: number }> {
    return this.request<{ users: User[]; total: number }>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getAdminVendors(filters?: { page?: number }): Promise<{ vendors: VendorProfile[]; total: number }> {
    return this.request<{ vendors: VendorProfile[]; total: number }>('/admin/vendors', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getAdminCategories(): Promise<Category[]> {
    return this.request<Category[]>('/admin/categories');
  }

  async getAdminAuditLogs(filters?: { page?: number }): Promise<{ events: AuditEvent[]; total: number }> {
    return this.request<{ events: AuditEvent[]; total: number }>('/admin/audit', {
      method: 'POST',
      body: JSON.stringify(filters || {}),
    });
  }

  async getAuthnTemplates(): Promise<string[]> {
    return this.request<string[]>('/automation/templates');
  }
}

class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Mock data store
const mockDataStore = {
  isInitialized: false,
  loginSession: null as { user: User; token: string } | null,
};

export const apiService = new ApiService();

export { ApiError };

// Initialize mock data on import
import { initializeMockData } from './mockData';

if (!mockDataStore.isInitialized) {
  initializeMockData();
}

export default apiService;
