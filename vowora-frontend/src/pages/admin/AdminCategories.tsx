import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { DataTable } from '../../components/common/DataTable';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './Admin.css';

export const AdminCategories: React.FC = () => {
  const categories = mockData.admin.getAllCategories();

  const columns = [
    {
      key: 'name',
      header: 'Category',
      render: (cat: { name: string; slug: string; description: string }) => (
        <div className="admin-category-cell">
          <span className="admin-category-name">{cat.name}</span>
          <span className="admin-category-slug">/{cat.slug}</span>
          <p className="admin-category-description">{cat.description}</p>
        </div>
      ),
    },
    {
      key: 'listingCount',
      header: 'Listings',
      render: (cat: { listingCount: number }) => (
        <span className="admin-count-cell">{cat.listingCount}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '120px',
      align: 'right',
      render: () => (
        <>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            Manage
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Categories</h1>
        <p>Manage marketplace categories and their settings.</p>
      </div>

      <Card>
        <div className="admin-actions-bar">
          <Button variant="primary" size="sm">
            Add category
          </Button>
          <Button variant="secondary" size="sm">
            Reorder
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={categories}
          keyField="id"
          emptyMessage="No categories found"
        />
      </Card>
    </div>
  );
};

export default AdminCategories;
