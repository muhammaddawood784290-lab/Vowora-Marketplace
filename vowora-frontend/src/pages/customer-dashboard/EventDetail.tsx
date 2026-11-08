import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatCurrency, formatDate } from '../../utils/format';
import './EventPages.css';

export const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = eventId ? mockData.events.getEvent(eventId) : undefined;

  if (!event) {
    return (
      <div className="event-page">
        <div className="event-page-inner">
          <EmptyState
            title="Event not found"
            description="This event doesn't exist or you don't have access to it."
            action={
              <Link to="/dashboard">
                <Button variant="secondary">Back to dashboard</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const vendorRequests = mockData.vendorRequests.getRequestsByCustomer(event.customerId);
  const shortlists = mockData.shortlists.getAllShortlists().filter((s) => s.eventId === eventId);
  const quotes = mockData.quotes.getAllQuotes().filter((q) => q.requestId.startsWith('req'));
  const invoices = mockData.invoices.getInvoicesByCustomer(event.customerId).filter(
    (i) => i.eventId === eventId
  );

  return (
    <div className="event-page">
      <div className="event-page-inner">
        <div className="event-page-header">
          <div className="event-page-title-row">
            <h1>{event.eventName}</h1>
            <StatusBadge status={event.status} />
          </div>
          <p className="event-page-subtitle">
            {event.description}
          </p>
        </div>

        {/* Event info card */}
        <Card className="event-info-card">
          <div className="event-info-grid">
            <div className="event-info-item">
              <span className="event-info-label">Event type</span>
              <span className="event-info-value">{event.eventType}</span>
            </div>
            <div className="event-info-item">
              <span className="event-info-label">Date</span>
              <span className="event-info-value">{formatDate(event.eventDate)}</span>
            </div>
            <div className="event-info-item">
              <span className="event-info-label">Time</span>
              <span className="event-info-value">{event.eventTime}</span>
            </div>
            <div className="event-info-item">
              <span className="event-info-label">Venue</span>
              <span className="event-info-value">{event.venue}</span>
            </div>
            <div className="event-info-item">
              <span className="event-info-label">Location</span>
              <span className="event-info-value">
                {event.city}, {event.country}
              </span>
            </div>
            <div className="event-info-item">
              <span className="event-info-label">Guests</span>
              <span className="event-info-value">{event.guestCount}</span>
            </div>
            <div className="event-info-item">
              <span className="event-info-label">Budget</span>
              <span className="event-info-value">
                {formatCurrency(event.budget, event.currency)}
              </span>
            </div>
            <div className="event-info-item">
              <span className="event-info-label">Status</span>
              <span className="event-info-value">
                <StatusBadge status={event.status} />
              </span>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="event-tabs">
          <div
            className={`event-tab ${window.location.pathname.includes('/details') || window.location.pathname.includes('/event/') ? 'active' : ''}`}
          >
            Overview
          </div>
          <div className="event-tab">Vendor requests</div>
          <div className="event-tab">Quotes</div>
          <div className="event-tab">Invoices</div>
        </div>

        {/* Content */}
        <div className="event-content">
          <div className="event-section">
            <h3 className="event-section-title">Planner</h3>
            {event.plannerName ? (
              <Card>
                <div className="event-planner-info">
                  <div className="event-planner-avatar">
                    {mockData.users.getUserById(event.plannerId?.replace('user-', '') + 'p1')?.avatar ? (
                      <img
                        src={mockData.users.getUserById('user-p1')?.avatar}
                        alt={event.plannerName}
                      />
                    ) : (
                      <span>{event.plannerName.split(' ').map((n) => n[0]).join('')}</span>
                    )}
                  </div>
                  <div className="event-planner-details">
                    <span className="event-planner-name">{event.plannerName}</span>
                    <Link
                      to={`/marketplace/planner/${event.plannerId}`}
                      className="event-planner-link"
                    >
                      View profile
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="event-empty-card">
                <EmptyState
                  title="No planner assigned"
                  description="You can browse and request a planner to help coordinate this event."
                  action={
                    <Link to={`/dashboard/planner-selection?eventId=${eventId}`}>
                      <Button variant="primary">Find a planner</Button>
                    </Link>
                  }
                />
              </Card>
            )}
          </div>

          <div className="event-section">
            <h3 className="event-section-title">Vendor requests</h3>
            {vendorRequests.length === 0 ? (
              <Card className="event-empty-card">
                <EmptyState
                  title="No vendor requests yet"
                  description="Browse the marketplace and send requests to vendors for this event."
                  action={
                    <Link to="/marketplace">
                      <Button variant="secondary">Browse marketplace</Button>
                    </Link>
                  }
                />
              </Card>
            ) : (
              <div className="event-requests">
                {vendorRequests.map((req) => (
                  <Card key={req.id} className="event-request-card">
                    <div className="event-request-header">
                      <span className="event-request-vendor">{req.vendorName}</span>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="event-request-type">{req.requestType}</p>
                    {req.message && (
                      <p className="event-request-message">{req.message}</p>
                    )}
                    <div className="event-request-meta">
                      <span>Response deadline: {formatDate(req.responseDeadline)}</span>
                      <Link
                        to={`/dashboard/request/${req.id}`}
                        className="event-request-link"
                      >
                        View details
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="event-section">
            <h3 className="event-section-title">Invoices</h3>
            {invoices.length === 0 ? (
              <Card className="event-empty-card">
                <EmptyState
                  title="No invoices yet"
                  description="Invoices will appear here once vendors issue them for your bookings."
                />
              </Card>
            ) : (
              <div className="event-invoices">
                {invoices.map((inv) => (
                  <Card key={inv.id} className="event-invoice-card">
                    <div className="event-invoice-header">
                      <span className="event-invoice-number">{inv.invoiceNumber}</span>
                      <StatusBadge status={inv.paymentStatus} />
                    </div>
                    <div className="event-invoice-details">
                      <span>{formatCurrency(inv.amount, inv.currency)}</span>
                      <span>Due {formatDate(inv.dueDate)}</span>
                    </div>
                    <Link
                      to={`/dashboard/invoice/${inv.id}`}
                      className="event-invoice-link"
                    >
                      View invoice
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
