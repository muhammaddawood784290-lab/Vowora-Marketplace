import React from 'react';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockData } from '../../services/mockData';
import { formatCurrency } from '../../utils/format';
import './Admin.css';

export const AdminDashboard: React.FC = () => {
  const users = mockData.admin.getAllUsers();
  const vendors = mockData.admin.getAllVendors();
  const categories = mockData.admin.getAllCategories();
  const auditLogs = mockData.admin.getAuditLogs();

  const customerCount = users.filter((u) => u.role === 'customer').length;
  const vendorCount = users.filter((u) => u.role === 'vendor').length;
  const plannerCount = users.filter((u) => u.role === 'planner').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const activeVendors = vendors.filter((v) => v.isVerified).length;

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <h1>Admin dashboard</h1>
        <p>
          Manage users, vendors, planners, categories, subscription plans, verification, and audit
          activity.
        </p>
      </div>

      <div className="admin-stats-grid">
        <Card className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-users">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{users.length}</span>
            <span className="admin-stat-label">Total users</span>
          </div>
        </Card>
        <Card className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-vendors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 21h18" />
              <path d="M5 21V7l8-4v18" />
              <path d="M19 21V11l-6-4" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{vendors.length}</span>
            <span className="admin-stat-label">Vendors</span>
          </div>
        </Card>
        <Card className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-planners">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{plannerCount}</span>
            <span className="admin-stat-label">Planners</span>
          </div>
        </Card>
        <Card className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-categories">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{categories.length}</span>
            <span className="admin-stat-label">Categories</span>
          </div>
        </Card>
      </div>

      <div className="admin-grid-2">
        <Card>
          <div className="admin-section-header">
            <h3>User breakdown</h3>
          </div>
          <div className="admin-breakdown">
            <div className="admin-breakdown-item">
              <span className="admin-breakdown-label">Customers</span>
              <span className="admin-breakdown-value">{customerCount}</span>
            </div>
            <div className="admin-breakdown-item">
              <span className="admin-breakdown-label">Vendors</span>
              <span className="admin-breakdown-value">{vendorCount}</span>
            </div>
            <div className="admin-breakdown-item">
              <span className="admin-breakdown-label">Planners</span>
              <span className="admin-breakdown-value">{plannerCount}</span>
            </div>
            <div className="admin-breakdown-item">
              <span className="admin-breakdown-label">Admins</span>
              <span className="admin-breakdown-value">{adminCount}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="admin-section-header">
            <h3>Recent audit activity</h3>
            <span className="admin-link">View all</span>
          </div>
          <div className="admin-audit-list">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="admin-audit-item">
                <div className="admin-audit-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="4 17 9 22 20 9" />
                    <path d="M9 22l-3-3 3-3" />
                  </svg>
                </div>
                <div className="admin-audit-content">
                  <span className="admin-audit-action">{log.action.replace(/_/g, ' ')}</span>
                  <span className="admin-audit-details">
                    {log.actorName} — {log.resourceName}
                  </span>
                </div>
                <span className="admin-audit-time">
                  {new Date(log.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="admin-info-card">
        <div className="admin-info-content">
          <div className="admin-info-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <h3>Admin placeholder</h3>
            <p>
              Admin functionality is a placeholder in the frontend. Full admin features — user
              management, vendor and planner approval, category management, subscription plan
              configuration, verification workflows, and audit log review — will be implemented
              when the FastAPI backend is connected.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
