import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatDate } from '../../utils/format';
import './VendorPlannerDashboard.css';

export const AvailabilityManager: React.FC = () => {
  const slots = mockData.marketplace.getAvailability('user-v1');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Availability</h1>
        <p>Manage your open dates and availability for bookings.</p>
      </div>

      <div className="availability-header-actions">
        <Button variant="primary">Add dates</Button>
        <Button variant="secondary">Set recurring availability</Button>
      </div>

      <Card>
        <div className="availability-calendar-header">
          <h3>Upcoming availability</h3>
          <span className="availability-count">
            {slots.filter((s) => s.status === 'available').length} available dates
          </span>
        </div>

        {slots.length === 0 ? (
          <EmptyState
            title="No availability set"
            description="Add your available dates so customers can book your services."
            action={<Button variant="secondary">Add dates</Button>}
          />
        ) : (
          <div className="availability-grid">
            {slots.map((slot) => (
              <div key={slot.id} className={`availability-date ${slot.status}`}>
                <span className="availability-date-label">{formatDate(slot.date)}</span>
                <span className="availability-time">{slot.startTime} — {slot.endTime}</span>
                <StatusBadge status={slot.status} size="sm" />
                {slot.maxBookings !== undefined && (
                  <span className="availability-slots">
                    {slot.currentBookings}/{slot.maxBookings} booked
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="availability-info-card">
        <h3 className="editor-section-title">Availability settings</h3>
        <p className="availability-info-text">
          Availability helps customers see when you can take on new bookings. You can set individual
          dates, recurring availability patterns, and booking windows. Availability is stored per
          vendor or planner and used for scheduling suggestions.
        </p>
      </Card>
    </div>
  );
};

export default AvailabilityManager;
