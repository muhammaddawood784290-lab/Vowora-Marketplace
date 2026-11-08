import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DataTable } from '../../components/common/DataTable';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatDate } from '../../utils/format';
import './VendorPlannerDashboard.css';

export const CRMPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'lead' | 'opportunity' | 'customer' | 'inactive'>('all');
  const contacts = mockData.crm.getAllContacts('user-v1', 'vendor');
  const filtered = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter);

  const columns = [
    {
      key: 'name',
      header: 'Contact',
      render: (c: { firstName: string; lastName: string; email: string; company?: string }) => (
        <div className="crm-contact-cell">
          <div className="crm-contact-avatar">
            {c.firstName[0]}{c.lastName[0]}
          </div>
          <div>
            <span className="crm-contact-name">
              {c.firstName} {c.lastName}
            </span>
            <span className="crm-contact-email">{c.email}</span>
            {c.company && (
              <span className="crm-contact-company">{c.company}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (c: { status: string }) => (
        <StatusBadge status={c.status} />
      ),
    },
    {
      key: 'leadSource',
      header: 'Source',
      render: (c: { leadSource: string }) => (
        <span className="crm-source-cell">{c.leadSource}</span>
      ),
    },
    {
      key: 'lastContacted',
      header: 'Last contacted',
      render: (c: { lastContacted?: string }) => (
        <span className="crm-last-cell">
          {c.lastContacted ? formatDate(c.lastContacted) : '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '100px',
      align: 'right',
      render: () => (
        <Button variant="ghost" size="sm">
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>CRM</h1>
        <p>Track customers, leads, and opportunities.</p>
      </div>

      <div className="crm-header-actions">
        <Button variant="primary" size="sm">
          Add contact
        </Button>
        <div className="crm-filters">
          {(['all', 'lead', 'opportunity', 'customer', 'inactive'] as const).map((f) => (
            <button
              key={f}
              className={`filter-chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && contacts.length > 0 && (
                <span className="filter-badge">{contacts.length}</span>
              )}
              {f !== 'all' && contacts.filter((c) => c.status === f).length > 0 && (
                <span className="filter-badge">
                  {contacts.filter((c) => c.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={filtered}
          keyField="id"
          emptyMessage="No contacts match the current filter"
        />
      </Card>
    </div>
  );
};

export default CRMPage;
