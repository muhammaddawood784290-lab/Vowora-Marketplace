import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Tabs, TabPanel } from '../../components/common/Tabs';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatCurrency } from '../../utils/format';
import './VendorPlannerDashboard.css';

interface VendorPlannerDashboardProps {
  role: 'vendor' | 'planner';
  userId: string;
}

export const VendorPlannerDashboard: React.FC<VendorPlannerDashboardProps> = ({
  role,
  userId,
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const isVendor = role === 'vendor';

  const vendorProfile = mockData.users.getVendorProfile(userId);
  const plannerProfile = mockData.users.getPlannerProfile(userId);
  const profile = isVendor ? vendorProfile : plannerProfile;
  const profileAsAny = profile as any;
  const subscription = mockData.users.getSubscription(userId);
  const requests = isVendor
    ? mockData.vendorRequests.getRequestsByVendor(userId)
    : [];
  const assignedEvents = isVendor
    ? []
    : mockData.events.getEventsByCustomer(userId).filter((e) => e.plannerId === userId);
  const quotes = isVendor
    ? mockData.quotes.getQuotesByVendor(userId)
    : [];
  const invoices = mockData.invoices
    .getAllInvoices()
    .filter((i) => (isVendor ? i.issuerId === userId : i.payerId === userId));
  const contacts = mockData.crm.getAllContacts(userId, isVendor ? 'vendor' : 'planner');
  const analytics = mockData.analytics.getSummary(userId, isVendor ? 'vendor' : 'planner');

  const pendingRequests = requests.filter((r) => r.status === 'pending').length;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'requests', label: isVendor ? 'Requests' : 'Events' },
    { id: 'crm', label: 'CRM' },
    { id: 'proposals', label: 'Proposals' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="vendor-planner-dashboard">
      <div className="page-header">
        <h1>
          {isVendor ? 'Vendor' : 'Planner'} dashboard
        </h1>
        <p>
          {isVendor
            ? `Welcome back, ${profile?.companyName || user?.firstName}. Manage your business, clients, and settings.`
            : `Welcome back, ${profile?.companyName || user?.firstName}. Manage your events and clients.`}
        </p>
      </div>

      {/* Profile card */}
      <Card className="profile-card">
        <div className="profile-card-inner">
          <div className="profile-card-left">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="profile-avatar" />
            ) : (
              <div className="profile-avatar profile-avatar-placeholder">
                {user?.firstName[0]}{user?.lastName[0]}
              </div>
            )}
            <div>
              <h2 className="profile-name">
                {user?.firstName} {user?.lastName}
              </h2>
              {profileAsAny?.companyName && (
                <span className="profile-company">{profileAsAny?.companyName}</span>
              )}
              {profileAsAny?.title && (
                <span className="profile-title">{profileAsAny?.title}</span>
              )}
              <div className="profile-meta">
                {profileAsAny?.categoryId && (
                  <span className="profile-meta-item">
                    {mockData.marketplace.getCategories().find((c) => c.id === profileAsAny?.categoryId)?.name}
                  </span>
                )}
                {profileAsAny?.rating && (
                  <span className="profile-meta-item">
                    {profileAsAny?.rating?.toFixed(1)} rating · {profileAsAny?.reviewCount} reviews
                  </span>
                )}
                {subscription && (
                  <span className="profile-plan">
                    <StatusBadge status={subscription.plan} />
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="profile-card-right">
            <div className="profile-stat">
              <span className="profile-stat-value">
                {analytics.completedEvents}
              </span>
              <span className="profile-stat-label">Completed</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <span className="profile-stat-value">
                {analytics.activeBookings}
              </span>
              <span className="profile-stat-label">Active</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <span className="profile-stat-value">
                {formatCurrency(analytics.totalRevenue, analytics.currency)}
              </span>
              <span className="profile-stat-label">Revenue</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Pending requests banner */}
      {isVendor && pendingRequests > 0 && (
        <Card className="requests-banner">
          <div className="requests-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <div>
              <strong>{pendingRequests} pending request{pendingRequests > 1 ? 's' : ''}</strong>
              <p>Respond to incoming requests from customers looking for your services.</p>
            </div>
          </div>
          <Button variant="primary" size="sm">
            View requests
          </Button>
        </Card>
      )}

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="tab-content">
        <TabPanel id="overview" hidden={activeTab !== 'overview'}>
          <div className="dashboard-overview-grid">
            {/* Quick stats */}
            <div className="overview-stats">
              <Card className="overview-stat-card">
                <div className="overview-stat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="overview-stat-content">
                  <span className="overview-stat-value">
                    {isVendor ? requests.length : assignedEvents.length}
                  </span>
                  <span className="overview-stat-label">
                    {isVendor ? 'Total requests' : 'Assigned events'}
                  </span>
                </div>
              </Card>
              <Card className="overview-stat-card">
                <div className="overview-stat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="overview-stat-content">
                  <span className="overview-stat-value">{invoices.length}</span>
                  <span className="overview-stat-label">Invoices</span>
                </div>
              </Card>
              <Card className="overview-stat-card">
                <div className="overview-stat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="overview-stat-content">
                  <span className="overview-stat-value">{contacts.length}</span>
                  <span className="overview-stat-label">CRM contacts</span>
                </div>
              </Card>
              <Card className="overview-stat-card">
                <div className="overview-stat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div className="overview-stat-content">
                  <span className="overview-stat-value">
                    {analytics.averageRating.toFixed(1)}
                  </span>
                  <span className="overview-stat-label">Average rating</span>
                </div>
              </Card>
            </div>

            {/* Recent activity */}
            <Card className="overview-activity-card">
              <h3 className="overview-section-title">Recent activity</h3>
              <div className="overview-activity-list">
                {isVendor && quotes.slice(0, 3).map((quote) => (
                  <div key={quote.id} className="activity-item">
                    <div className="activity-icon activity-icon-quote">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <span className="activity-title">Quote submitted</span>
                      <span className="activity-details">
                        {quote.vendorName} — {formatCurrency(quote.total, quote.currency)}
                      </span>
                    </div>
                    <StatusBadge status={quote.status} size="sm" />
                    <span className="activity-date">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {isVendor && invoices.slice(0, 3).map((inv) => (
                  <div key={inv.id} className="activity-item">
                    <div className="activity-icon activity-icon-invoice">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <span className="activity-title">Invoice issued</span>
                      <span className="activity-details">
                        {inv.invoiceNumber}
                      </span>
                    </div>
                    <StatusBadge status={inv.paymentStatus} size="sm" />
                    <span className="activity-date">
                      {new Date(inv.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {!isVendor && assignedEvents.slice(0, 3).map((evt) => (
                  <div key={evt.id} className="activity-item">
                    <div className="activity-icon activity-icon-event">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <span className="activity-title">Event assigned</span>
                      <span className="activity-details">
                        {evt.eventName}
                      </span>
                    </div>
                    <StatusBadge status={evt.status} size="sm" />
                    <span className="activity-date">
                      {new Date(evt.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabPanel>

        <TabPanel id="requests" hidden={activeTab !== 'requests'}>
          {isVendor ? (
            <div className="requests-empty">
              <EmptyStateNoData
                title="Incoming requests"
                description="Customer requests for your services will appear here."
                data={requests}
                emptyTitle="No requests yet"
                emptyDescription="Customers can request your services through the marketplace. Once you receive requests, they'll appear here for you to accept, reject, or counteroffer."
              />
            </div>
          ) : (
            <div className="requests-empty">
              <EmptyStateNoData
                title="Assigned events"
                description="Events assigned to you will appear here."
                data={assignedEvents}
                emptyTitle="No assigned events"
                emptyDescription="You haven't been assigned to any events yet. Assignments come from customers or the platform."
              />
            </div>
          )}
        </TabPanel>

        <TabPanel id="crm" hidden={activeTab !== 'crm'}>
          <div className="crm-section">
            <div className="crm-header">
              <h2>CRM Contacts</h2>
              <Button variant="secondary" size="sm">
                Add contact
              </Button>
            </div>
            <EmptyStateNoData
              title=""
              description=""
              data={contacts}
              emptyTitle="No CRM contacts yet"
              emptyDescription="Add customers and leads to your CRM to track interactions and opportunities."
            />
          </div>
        </TabPanel>

        <TabPanel id="proposals" hidden={activeTab !== 'proposals'}>
          <EmptyStateNoData
            title="Proposals"
            description="Proposals you've created or received will appear here."
            data={[]}
            emptyTitle="No proposals yet"
            emptyDescription="Proposals will appear here once you create or receive them for events."
          />
        </TabPanel>

        <TabPanel id="invoices" hidden={activeTab !== 'invoices'}>
          <EmptyStateNoData
            title="Invoices"
            description="Track invoices issued and received."
            data={invoices}
            emptyTitle="No invoices yet"
            emptyDescription="Invoices will appear here once you issue or receive them."
          />
        </TabPanel>

        <TabPanel id="analytics" hidden={activeTab !== 'analytics'}>
          <Card className="analytics-card">
            <h3 className="analytics-title">Analytics</h3>
            <p className="analytics-subtitle">
              Your performance at a glance.
            </p>
            <div className="analytics-grid">
              <div className="analytics-metric">
                <span className="analytics-metric-value">
                  {formatCurrency(analytics.totalRevenue, analytics.currency)}
                </span>
                <span className="analytics-metric-label">Total revenue</span>
              </div>
              <div className="analytics-metric">
                <span className="analytics-metric-value">{analytics.conversionRate}%</span>
                <span className="analytics-metric-label">Conversion rate</span>
              </div>
              <div className="analytics-metric">
                <span className="analytics-metric-value">
                  {analytics.averageRating.toFixed(1)}
                </span>
                <span className="analytics-metric-label">Average rating</span>
              </div>
              <div className="analytics-metric">
                <span className="analytics-metric-value">{analytics.reviewCount}</span>
                <span className="analytics-metric-label">Total reviews</span>
              </div>
            </div>
            <div className="analytics-chart-placeholder">
              <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
                <path
                  d="M0 110 L30 90 L60 80 L100 95 L140 60 L180 70 L220 40 L260 55 L300 30 L300 120 L0 120 Z"
                  fill="var(--color-gray-200)"
                />
                <path
                  d="M0 110 L30 90 L60 80 L100 95 L140 60 L180 70 L220 40 L260 55 L300 30"
                  fill="none"
                  stroke="var(--color-black)"
                  strokeWidth="1.5"
                />
              </svg>
              <p className="analytics-chart-label">Monthly revenue trend</p>
            </div>
          </Card>
        </TabPanel>
      </div>
    </div>
  );
};

function EmptyStateNoData({
  title,
  description,
  data,
  emptyTitle,
  emptyDescription,
}: {
  title?: string;
  description?: string;
  data: unknown[];
  emptyTitle: string;
  emptyDescription: string;
}) {
  if (data.length > 0) {
    // This is a placeholder — actual data rendering happens in respective pages
    return (
      <div className="data-placeholder">
        <p>Data loading...</p>
      </div>
    );
  }
  return (
    <Card>
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    </Card>
  );
}

export default VendorPlannerDashboard;
