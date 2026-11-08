import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatDate } from '../../utils/format';
import './EventPages.css';

export const CustomerNotifications: React.FC = () => {
  const notifications = mockData.notifications.getAllNotifications('user-c1');

  return (
    <div className="event-page">
      <div className="event-page-inner">
        <div className="event-page-header">
          <h1>Notifications</h1>
          <p>
            Stay updated on your events, proposals, invoices, and account activity.
          </p>
        </div>

        <div className="notifications-header">
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
          <select className="form-select notification-filter" defaultValue="all">
            <option value="all">All notifications</option>
            <option value="unread">Unread only</option>
            <option value="events">Events</option>
            <option value="requests">Requests</option>
            <option value="quotes">Quotes</option>
            <option value="invoices">Invoices</option>
          </select>
        </div>

        {notifications.length === 0 ? (
          <Card>
            <EmptyState
              title="No notifications"
              description="You're all caught up. New notifications will appear here."
            />
          </Card>
        ) : (
          <div className="notifications-list">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`notification-card ${notif.isRead ? 'notification-read' : ''}`}
              >
                <div className="notification-content">
                  <div className="notification-header">
                    <span className="notification-type">{notif.type.replace(/_/g, ' ')}</span>
                    <span className="notification-date">{formatDate(notif.createdAt)}</span>
                  </div>
                  <h3 className="notification-title">{notif.title}</h3>
                  <p className="notification-message">{notif.message}</p>
                  {notif.referenceType && (
                    <span className="notification-reference">
                      {notif.referenceType} #{notif.referenceId?.slice(-6)}
                    </span>
                  )}
                </div>
                {!notif.isRead && (
                  <div className="notification-unread-dot" />
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerNotifications;
