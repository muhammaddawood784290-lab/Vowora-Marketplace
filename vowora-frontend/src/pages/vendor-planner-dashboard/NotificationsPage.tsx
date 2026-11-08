import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatDate } from '../../utils/format';
import './VendorPlannerDashboard.css';

export const VendorPlannerNotifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const notifications = mockData.notifications.getAllNotifications('user-v1');
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Notifications</h1>
        <p>Stay updated on requests, quotes, invoices, and account activity.</p>
      </div>

      <div className="notifications-header">
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
        <div className="notifications-filters">
          <button
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
            {notifications.length > 0 && (
              <span className="filter-badge">{notifications.length}</span>
            )}
          </button>
          <button
            className={`filter-chip ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread
            {notifications.filter((n) => !n.isRead).length > 0 && (
              <span className="filter-badge">
                {notifications.filter((n) => !n.isRead).length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="notifications-list">
        {filtered.map((notif) => (
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
            </div>
            {!notif.isRead && <div className="notification-unread-dot" />}
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <EmptyState
            title="No notifications"
            description="You're all caught up. New notifications will appear here."
          />
        </Card>
      )}
    </div>
  );
};

export default VendorPlannerNotifications;
