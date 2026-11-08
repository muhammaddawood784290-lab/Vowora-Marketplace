import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DataTable } from '../../components/common/DataTable';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './Admin.css';

export const AdminUsers: React.FC = () => {
  const users = mockData.admin.getAllUsers();

  const columns = [
    {
      key: 'name',
      header: 'User',
      render: (user: { firstName: string; lastName: string; email: string; role: string; avatar?: string }) => (
        <div className="admin-user-cell">
          {user.avatar ? (
            <img src={user.avatar} alt="" className="admin-user-avatar" />
          ) : (
            <div className="admin-user-avatar admin-user-avatar-placeholder">
              {user.firstName[0]}{user.lastName[0]}
            </div>
          )}
          <div>
            <span className="admin-user-name">
              {user.firstName} {user.lastName}
            </span>
            <span className="admin-user-email">{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (user: { role: string }) => (
        <span className="admin-role-badge">
          <StatusBadge status={user.role} />
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (user: { isActive: boolean }) => (
        <StatusBadge status={user.isActive ? 'active' : 'cancelled'} />
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (user: { createdAt: string }) => (
        <span className="admin-date-cell">
          {new Date(user.createdAt).toLocaleDateString()}
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
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Users</h1>
        <p>Manage all users across roles.</p>
      </div>

      <Card>
        <div className="admin-actions-bar">
          <Button variant="primary" size="sm">
            Add user
          </Button>
          <select className="form-select" defaultValue="all">
            <option value="all">All roles</option>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="planner">Planner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <DataTable
          columns={columns}
          data={users}
          keyField="id"
          emptyMessage="No users found"
        />
      </Card>
    </div>
  );
};

export default AdminUsers;
