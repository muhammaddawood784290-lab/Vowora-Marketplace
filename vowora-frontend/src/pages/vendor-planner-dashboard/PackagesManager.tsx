import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import { formatCurrency } from '../../utils/format';
import './VendorPlannerDashboard.css';

export const PackagesManager: React.FC = () => {
  const packages = mockData.marketplace.getVendorPackages('user-v1');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Packages</h1>
        <p>Create and manage service packages with pricing and inclusions.</p>
      </div>

      <div className="packages-header-actions">
        <Button variant="primary">Create package</Button>
        <span className="packages-count">
          {packages.length} / {mockData.users.getVendorProfile('user-v1')?.packageCount} packages
        </span>
      </div>

      {packages.length === 0 ? (
        <Card>
          <EmptyState
            title="No packages yet"
            description="Create packages to offer bundled services with clear pricing."
            action={<Button variant="secondary">Create package</Button>}
          />
        </Card>
      ) : (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`package-card ${pkg.isPopular ? 'package-popular' : ''}`}>
              {pkg.isPopular && (
                <div className="package-popular-badge">Most popular</div>
              )}
              <div className="package-header">
                <div>
                  <h3 className="package-name">{pkg.name}</h3>
                  <p className="package-description">{pkg.description}</p>
                </div>
                <div className="package-price">
                  <span className="package-price-amount">
                    {formatCurrency(pkg.price, pkg.currency)}
                  </span>
                  <span className="package-price-duration">{pkg.duration}</span>
                </div>
              </div>

              <div className="package-section">
                <h4 className="package-section-title">Included</h4>
                <ul className="package-inclusions">
                  {pkg.inclusions.map((inc) => (
                    <li key={inc} className="package-inclusion">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-section">
                <h4 className="package-section-title">Excluded</h4>
                <ul className="package-exclusions">
                  {pkg.exclusions.map((exc) => (
                    <li key={exc} className="package-exclusion">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-actions">
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Duplicate
                </Button>
                <Button variant="ghost" size="sm">
                  Archive
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="packages-info-card">
        <h3 className="editor-section-title">Package limits</h3>
        <p className="packages-limit-text">
          Your plan allows up to{' '}
          <strong>
            {mockData.users.getVendorProfile('user-v1')?.packageCount}
          </strong>{' '}
          packages. Package limits are configurable in the database.
        </p>
      </Card>
    </div>
  );
};

export default PackagesManager;
