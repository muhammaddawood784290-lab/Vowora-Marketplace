import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Tabs, TabPanel } from '../../components/common/Tabs';
import { DataTable } from '../../components/common/DataTable';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatCurrency, formatDate } from '../../utils/format';
import './CustomerDashboard.css';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState(mockData.events.getEventsByCustomer(user?.id || ''));
  const [shortlists, setShortlists] = useState(mockData.shortlists.getAllShortlists());
  const [bookings, setBookings] = useState(mockData.bookings.getAllBookings());
  const [invoices, setInvoices] = useState(
    mockData.invoices.getInvoicesByCustomer(user?.id || '')
  );

  const customerEvents = events;
  const eventStatusCounts = {
    draft: customerEvents.filter((e) => e.status === 'draft').length,
    active: customerEvents.filter(
      (e) =>
        !['draft', 'completed', 'cancelled'].includes(e.status)
    ).length,
    completed: customerEvents.filter((e) => e.status === 'completed').length,
  };

  const recentBookings = bookings.slice(0, 5);
  const pendingInvoices = invoices.filter((i) => i.paymentStatus === 'unpaid');

  return (
    <div className="customer-dashboard">
      <div className="page-header">
        <h1>Welcome back, {user?.firstName}</h1>
        <p>
          Manage your events, shortlists, proposals, and bookings from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-icon stat-icon-events">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{customerEvents.length}</span>
            <span className="stat-label">Total events</span>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon stat-icon-active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{eventStatusCounts.active}</span>
            <span className="stat-label">Active events</span>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon stat-icon-bookings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{bookings.length}</span>
            <span className="stat-label">Bookings</span>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon stat-icon-invoices">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{pendingInvoices.length}</span>
            <span className="stat-label">Pending payments</span>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'events', label: 'Events' },
          { id: 'shortlists', label: 'Shortlists' },
          { id: 'proposals', label: 'Proposals' },
          { id: 'bookings', label: 'Bookings' },
          { id: 'invoices', label: 'Invoices' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="tab-content">
        <TabPanel id="events" hidden={activeTab !== 'events'}>
          <div className="dashboard-section-header">
            <h2>Your events</h2>
            <Link to="/dashboard/event-brief">
              <Button variant="primary" size="sm">
                Create event brief
              </Button>
            </Link>
          </div>
          {customerEvents.length === 0 ? (
            <EmptyState
              title="No events yet"
              description="Create your first event brief to start planning with vendors and planners."
              action={
                <Link to="/dashboard/event-brief">
                  <Button variant="primary">Create event brief</Button>
                </Link>
              }
            />
          ) : (
            <DataTable
              columns={[
                {
                  key: 'eventName',
                  header: 'Event',
                  render: (event) => (
                    <div className="event-cell">
                      <span className="event-name">{event.eventName}</span>
                      <span className="event-date">{formatDate(event.eventDate)}</span>
                    </div>
                  ),
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (event) => (
                    <StatusBadge status={event.status} />
                  ),
                },
                {
                  key: 'budget',
                  header: 'Budget',
                  render: (event) => (
                    <span className="budget-cell">
                      {formatCurrency(event.budget, event.currency)}
                    </span>
                  ),
                },
                {
                  key: 'plannerName',
                  header: 'Planner',
                  render: (event) => (
                    <span className="planner-cell">
                      {event.plannerName || (
                        <span className="text-muted">Not assigned</span>
                      )}
                    </span>
                  ),
                },
                {
                  key: 'actions',
                  header: '',
                  width: '120px',
                  align: 'right',
                  render: (event) => (
                    <Link
                      to={`/dashboard/event/${event.id}`}
                      className="action-link"
                    >
                      View
                    </Link>
                  ),
                },
              ]}
              data={customerEvents}
              keyField="id"
              emptyMessage="No events yet"
            />
          )}
        </TabPanel>

        <TabPanel id="shortlists" hidden={activeTab !== 'shortlists'}>
          <div className="dashboard-section-header">
            <h2>Vendor shortlists</h2>
            <Link to="/dashboard/shortlist">
              <Button variant="secondary" size="sm">
                Create shortlist
              </Button>
            </Link>
          </div>
          {shortlists.length === 0 ? (
            <EmptyState
              title="No shortlists yet"
              description="Shortlists help you compare vendors side by side before making a decision."
              action={
                <Link to="/dashboard/shortlist">
                  <Button variant="secondary">Create shortlist</Button>
                </Link>
              }
            />
          ) : (
            <DataTable
              columns={[
                {
                  key: 'eventName',
                  header: 'Event',
                  render: (sl) => (
                    <div className="shortlist-cell">
                      <span className="shortlist-name">{sl.eventName}</span>
                      <span className="shortlist-meta">
                        {sl.vendorCount} vendors
                      </span>
                    </div>
                  ),
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (sl) => (
                    <StatusBadge status={sl.status} />
                  ),
                },
                {
                  key: 'actions',
                  header: '',
                  width: '120px',
                  align: 'right',
                  render: (sl) => (
                    <Link
                      to={`/dashboard/shortlist/${sl.id}`}
                      className="action-link"
                    >
                      View
                    </Link>
                  ),
                },
              ]}
              data={shortlists}
              keyField="id"
              emptyMessage="No shortlists yet"
            />
          )}
        </TabPanel>

        <TabPanel id="proposals" hidden={activeTab !== 'proposals'}>
          <div className="dashboard-section-header">
            <h2>Proposals</h2>
          </div>
          <EmptyState
            title="No proposals yet"
            description="Proposals will appear here once a planner or vendor submits one for your event."
          />
        </TabPanel>

        <TabPanel id="bookings" hidden={activeTab !== 'bookings'}>
          <div className="dashboard-section-header">
            <h2>Bookings</h2>
          </div>
          {bookings.length === 0 ? (
            <EmptyState
              title="No bookings yet"
              description="Bookings will appear here after you approve a proposal and confirm your event."
            />
          ) : (
            <DataTable
              columns={[
                {
                  key: 'eventName',
                  header: 'Event',
                  render: (booking) => (
                    <div className="booking-cell">
                      <span className="booking-name">{booking.eventName}</span>
                      <span className="booking-dates">
                        {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
                      </span>
                    </div>
                  ),
                },
                {
                  key: 'vendorName',
                  header: 'Vendor',
                  render: (booking) => (
                    <span className="vendor-cell">
                      {booking.vendorName || (
                        <span className="text-muted">—</span>
                      )}
                    </span>
                  ),
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (booking) => (
                    <StatusBadge status={booking.status} />
                  ),
                },
                {
                  key: 'totalAmount',
                  header: 'Amount',
                  render: (booking) => (
                    <span className="amount-cell">
                      {formatCurrency(booking.totalAmount, booking.currency)}
                    </span>
                  ),
                },
                {
                  key: 'actions',
                  header: '',
                  width: '120px',
                  align: 'right',
                  render: (booking) => (
                    <Link
                      to={`/dashboard/booking/${booking.id}`}
                      className="action-link"
                    >
                      View
                    </Link>
                  ),
                },
              ]}
              data={bookings}
              keyField="id"
              emptyMessage="No bookings yet"
            />
          )}
        </TabPanel>

        <TabPanel id="invoices" hidden={activeTab !== 'invoices'}>
          <div className="dashboard-section-header">
            <h2>Invoices</h2>
          </div>
          {invoices.length === 0 ? (
            <EmptyState
              title="No invoices yet"
              description="Invoices will appear here once vendors or planners issue them for your bookings."
            />
          ) : (
            <DataTable
              columns={[
                {
                  key: 'invoiceNumber',
                  header: 'Invoice',
                  render: (invoice) => (
                    <div className="invoice-cell">
                      <span className="invoice-number">{invoice.invoiceNumber}</span>
                      <span className="invoice-event">{invoice.eventName}</span>
                    </div>
                  ),
                },
                {
                  key: 'payeeName',
                  header: 'From',
                  render: (invoice) => (
                    <span className="payee-cell">{invoice.payeeName}</span>
                  ),
                },
                {
                  key: 'amount',
                  header: 'Amount',
                  render: (invoice) => (
                    <span className="amount-cell">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </span>
                  ),
                },
                {
                  key: 'dueDate',
                  header: 'Due',
                  render: (invoice) => (
                    <span className="due-cell">{formatDate(invoice.dueDate)}</span>
                  ),
                },
                {
                  key: 'paymentStatus',
                  header: 'Payment',
                  render: (invoice) => (
                    <StatusBadge status={invoice.paymentStatus} />
                  ),
                },
                {
                  key: 'actions',
                  header: '',
                  width: '120px',
                  align: 'right',
                  render: (invoice) => (
                    <Link
                      to={`/dashboard/invoice/${invoice.id}`}
                      className="action-link"
                    >
                      View
                    </Link>
                  ),
                },
              ]}
              data={invoices}
              keyField="id"
              emptyMessage="No invoices yet"
            />
          )}
        </TabPanel>
      </div>
    </div>
  );
};

export default CustomerDashboard;
