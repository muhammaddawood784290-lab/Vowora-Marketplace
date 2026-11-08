import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DataTable } from '../../components/common/DataTable';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './Admin.css';

export const AdminVendors: React.FC = () => {
  const vendors = mockData.admin.getAllVendors();

  const columns = [
    {
      key: 'companyName',
      header: 'Company',
      render: (vendor: { companyName: string; userId: string }) => (
        <div className="admin-vendor-cell">
          <span className="admin-vendor-name">{vendor.companyName}</span>
          <span className="admin-vendor-user">{vendor.userId}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (vendor: { categoryId: string }) => (
        <span className="admin-text-secondary">
          {mockData.marketplace.getCategories().find((c) => c.id === vendor.categoryId)?.name || '—'}
        </span>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (vendor: { rating: number; reviewCount: number }) => (
        <span className="admin-rating-cell">
          {vendor.rating.toFixed(1)} ({vendor.reviewCount})
        </span>
      ),
    },
    {
      key: 'responseTime',
      header: 'Response',
      render: (vendor: { responseTime: string }) => (
        <span className="admin-text-secondary">{vendor.responseTime}</span>
      ),
    },
    {
      key: 'verification',
      header: 'Verification',
      render: (vendor: { isVerified: boolean }) => (
        <StatusBadge status={vendor.isVerified ? 'verified' : 'unverified'} />
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      render: (vendor: { brandingTier: string }) => (
        <span className="admin-plan-cell">
          {vendor.brandingTier.charAt(0).toUpperCase() + vendor.brandingTier.slice(1)}
        </span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (vendor) => (
        <StatusBadge status={vendor.isActive ? 'active' : 'cancelled'} />
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '100px',
      align: 'right',
      render: () => (
        <>
          <Button variant="ghost" size="sm">
            Verify
          </Button>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Vendors</h1>
        <p>Manage vendor profiles, verification, and plans.</p>
      </div>

      <Card>
        <div className="admin-actions-bar">
          <Button variant="primary" size="sm">
            Add vendor
          </Button>
          <Button variant="secondary" size="sm">
            Export list
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={vendors}
          keyField="userId"
          emptyMessage="No vendors found"
        />
      </Card>
    </div>
  );
};

export default AdminVendors;
