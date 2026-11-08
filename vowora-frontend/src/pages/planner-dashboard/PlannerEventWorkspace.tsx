import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatDate, formatCurrency } from '../../utils/format';
import './PlannerDashboard.css';

export const PlannerEventWorkspace: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = eventId ? mockData.events.getEvent(eventId) : undefined;

  if (!event) {
    return (
      <div className="page-container">
        <Card>
          <EmptyState
            title="Event not found"
            description="This event doesn't exist or you don't have access to it."
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-row">
          <h1>Event workspace</h1>
          <StatusBadge status={event.status} />
        </div>
        <p className="page-header-subtitle">{event.eventName}</p>
      </div>

      <div className="event-workspace-grid">
        <Card className="event-workspace-card">
          <h3 className="workspace-card-title">Event details</h3>
          <dl className="workspace-details-list">
            <dt>Date</dt>
            <dd>{formatDate(event.eventDate)}</dd>
            <dt>Time</dt>
            <dd>{event.eventTime}</dd>
            <dt>Venue</dt>
            <dd>{event.venue}</dd>
            <dt>Location</dt>
            <dd>{event.city}, {event.country}</dd>
            <dt>Guests</dt>
            <dd>{event.guestCount}</dd>
            <dt>Budget</dt>
            <dd>{formatCurrency(event.budget, event.currency)}</dd>
          </dl>
        </Card>

        <Card className="event-workspace-card">
          <h3 className="workspace-card-title">Vendors</h3>
          <p className="workspace-card-subtitle">
            Coordinate with vendors on this event.
          </p>
          <div className="vendors-list">
            {mockData.marketplace.getListings({ pageSize: 3 }).listings.map((listing) => (
              <div key={listing.id} className="vendor-row">
                <div className="vendor-info">
                  <span className="vendor-name">{listing.title}</span>
                  <span className="vendor-category">
                    {mockData.marketplace.getCategories().find((c) => c.id === listing.categoryId)?.name}
                  </span>
                </div>
                <div className="vendor-status">
                  <StatusBadge status={listing.isAvailable ? 'available' : 'unavailable'} size="sm" />
                </div>
                <div className="vendor-actions">
                  <Button variant="ghost" size="sm">
                    Message
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="mt-4">
            Add vendor
          </Button>
        </Card>

        <Card className="event-workspace-card">
          <h3 className="workspace-card-title">Quotes comparison</h3>
          <p className="workspace-card-subtitle">
            Compare quotes from vendors for this event.
          </p>
          <EmptyState
            title="No quotes yet"
            description="Vendor quotes will appear here for comparison."
          />
        </Card>

        <Card className="event-workspace-card">
          <h3 className="workspace-card-title">Proposals</h3>
          <p className="workspace-card-subtitle">
            Create and manage proposals for this event.
          </p>
          <EmptyState
            title="No proposals yet"
            description="Create a proposal once you've reviewed vendor quotes."
            action={
              <Button variant="primary" size="sm">
                Create proposal
              </Button>
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default PlannerEventWorkspace;
