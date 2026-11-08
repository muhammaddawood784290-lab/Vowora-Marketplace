import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './Admin.css';

export const AdminVerification: React.FC = () => {
  const vendors = mockData.admin.getAllVendors();

  const pendingVerification = vendors.filter((v) => !v.isVerified);
  const verified = vendors.filter((v) => v.isVerified);

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Verification</h1>
        <p>Review and approve vendor and planner verification requests.</p>
      </div>

      <div className="admin-verification-tabs">
        <div className="admin-verification-tab active">Pending ({pendingVerification.length})</div>
        <div className="admin-verification-tab">Verified ({verified.length})</div>
        <div className="admin-verification-tab">Rejected (0)</div>
      </div>

      {pendingVerification.length === 0 ? (
        <Card>
          <EmptyState
            title="No pending verifications"
            description="All vendors and planners have been verified."
          />
        </Card>
      ) : (
        <Card>
          <div className="admin-verification-list">
            {pendingVerification.map((vendor) => (
              <div key={vendor.userId} className="admin-verification-item">
                <div className="admin-verification-info">
                  <h3 className="admin-verification-name">{vendor.companyName}</h3>
                  <p className="admin-verification-user">{vendor.userId}</p>
                  <p className="admin-verification-meta">
                    {vendor.rating?.toFixed(1)} rating · {vendor.reviewCount} reviews
                  </p>
                </div>
                <div className="admin-verification-actions">
                  <Button variant="secondary" size="sm">
                    Request more info
                  </Button>
                  <Button variant="primary" size="sm">
                    Approve
                  </Button>
                  <Button variant="danger" size="sm">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="admin-verification-info">
        <h3 className="admin-section-title">Verification process</h3>
        <p className="admin-section-description">
          Verification confirms that vendors and planners are legitimate and qualified. The verification
          process includes document review, identity confirmation, and quality checks. Verified profiles
          receive a badge and improved marketplace visibility.
        </p>
        <p className="admin-note">
          Note: Full verification workflow with document upload, automated checks, and audit trails will
          be implemented with the backend.
        </p>
      </Card>
    </div>
  );
};

export default AdminVerification;
