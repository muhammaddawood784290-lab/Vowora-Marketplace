import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DataTable } from '../../components/common/DataTable';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatDate } from '../../utils/format';
import './Admin.css';

export const AdminAudit: React.FC = () => {
  const [logs] = useState(mockData.admin.getAuditLogs());
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const paginatedLogs = logs.slice((page - 1) * pageSize, page * pageSize);

  const columns: any = [
    {
      key: 'action',
      header: 'Action',
      render: (log: { action: string; actorName: string; resourceName: string }) => (
        <div className="admin-audit-cell">
          <span className="admin-audit-action">{log.action.replace(/_/g, ' ')}</span>
          <span className="admin-audit-details">
            {log.actorName} — {log.resourceName}
          </span>
        </div>
      ),
    },
    {
      key: 'resourceType',
      header: 'Resource',
      render: (log: { resourceType: string }) => (
        <span className="admin-text-secondary">{log.resourceType}</span>
      ),
    },
    {
      key: 'resourceId',
      header: 'ID',
      render: (log: { resourceId: string }) => (
        <span className="admin-id-cell">{log.resourceId.slice(-8)}</span>
      ),
    },
    {
      key: 'details',
      header: 'Details',
      render: (log: { details: string }) => (
        <span className="admin-text-secondary admin-details-cell">{log.details}</span>
      ),
    },
    {
      key: 'ipAddress',
      header: 'IP',
      render: (log: { ipAddress: string }) => (
        <span className="admin-ip-cell">{log.ipAddress}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (log: { createdAt: string }) => (
        <span className="admin-date-cell">{formatDate(log.createdAt)}</span>
      ),
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Audit activity</h1>
        <p>Review audit logs for all user actions across the platform.</p>
      </div>

      <Card>
        <div className="admin-actions-bar">
          <Button variant="secondary" size="sm">
            Export logs
          </Button>
          <select className="form-select" defaultValue="all">
            <option value="all">All actions</option>
            <option value="UPDATE_PROFILE">Update profile</option>
            <option value="CREATE_QUOTE">Create quote</option>
            <option value="VERIFY_VENDOR">Verify vendor</option>
            <option value="UPDATE_PLAN">Update plan</option>
            <option value="ASSIGN_EVENT">Assign event</option>
          </select>
          <input
            type="date"
            className="form-input admin-date-input"
            placeholder="From date"
          />
          <input
            type="date"
            className="form-input admin-date-input"
            placeholder="To date"
          />
        </div>
        <DataTable
          columns={columns}
          data={paginatedLogs}
          keyField="id"
          pageSize={pageSize}
          currentPage={page}
          totalItems={logs.length}
          onPageChange={setPage}
          emptyMessage="No audit logs found"
        />
      </Card>
    </div>
  );
};

export default AdminAudit;
