import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './VendorPlannerDashboard.css';

export const PortfolioManager: React.FC = () => {
  const assets = mockData.media.getAllAssets('user-v1', 'vendor');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Portfolio manager</h1>
        <p>Manage your portfolio images and media.</p>
      </div>

      <div className="portfolio-header-actions">
        <Button variant="primary">Upload images</Button>
        <span className="portfolio-count">
          {assets.length} images · {mockData.users.getVendorProfile('user-v1')?.portfolioCount} total
        </span>
      </div>

      {assets.length === 0 ? (
        <Card>
          <EmptyState
            title="No portfolio images"
            description="Upload images to showcase your work to potential customers."
            action={<Button variant="secondary">Upload images</Button>}
          />
        </Card>
      ) : (
        <div className="portfolio-grid">
          {assets.map((asset) => (
            <Card key={asset.id} className="portfolio-card">
              {asset.thumbnailUrl ? (
                <img src={asset.thumbnailUrl} alt={asset.altText || ''} className="portfolio-image" />
              ) : (
                <div className="portfolio-image-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
              <div className="portfolio-card-actions">
                <Button variant="ghost" size="sm" icon={<StarIcon />}>
                  Set primary
                </Button>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="portfolio-info-card">
        <h3 className="editor-section-title">Portfolio limits</h3>
        <p className="portfolio-limit-text">
          Your{' '}
          <span className="portfolio-plan-name">
            {mockData.users.getVendorProfile('user-v1')?.brandingTier || 'basic'}
          </span>{' '}
          plan includes{' '}
          <strong>
            {mockData.users.getVendorProfile('user-v1')?.portfolioCount} portfolio images
          </strong>
          . Images are stored securely and displayed on your public profile.
        </p>
      </Card>
    </div>
  );
};

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default PortfolioManager;
