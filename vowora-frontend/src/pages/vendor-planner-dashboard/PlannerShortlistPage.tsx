import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './VendorPlannerDashboard.css';

export const PlannerShortlistPage: React.FC = () => {
  const shortlist = mockData.shortlists.getShortlist('sl-1');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Vendor shortlist</h1>
        <p>Review and compare vendors for your assigned events.</p>
      </div>

      {!shortlist ? (
        <Card>
          <EmptyState
            title="No shortlists yet"
            description="Create a shortlist to compare vendors for your events."
          />
        </Card>
      ) : (
        <div className="shortlist-page-content">
          <Card className="shortlist-overview-card">
            <div className="shortlist-overview-header">
              <div>
                <h3 className="shortlist-event-name">{shortlist.eventName}</h3>
                <p className="shortlist-event-meta">
                  {shortlist.vendorCount} vendors · Created{' '}
                  {new Date(shortlist.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge status={shortlist.status} />
            </div>
            <div className="shortlist-actions">
              <Button variant="secondary" size="sm">
                Share shortlist
              </Button>
              <Button variant="primary" size="sm">
                Finalize
              </Button>
            </div>
          </Card>

          <div className="vendor-compare-grid">
            {mockData.marketplace.getListings({ pageSize: 2 }).listings.map((listing) => {
              const vendor = mockData.users.getVendorProfile(listing.vendorId);
              return (
                <Card key={listing.id} className="vendor-compare-card">
                  <div className="vendor-compare-header">
                    {vendor?.isVerified && <StatusBadge status="verified" size="sm" />}
                    <span className="vendor-compare-name">
                      {vendor?.companyName || 'Vendor'}
                    </span>
                    <span className="vendor-compare-rating">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {listing.rating.toFixed(1)} ({listing.reviewCount} reviews)
                    </span>
                  </div>
                  {listing.imageUrl && (
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="vendor-compare-image"
                    />
                  )}
                  <h3 className="vendor-compare-title">{listing.title}</h3>
                  <p className="vendor-compare-description">
                    {listing.description.slice(0, 150)}
                    {listing.description.length > 150 ? '...' : ''}
                  </p>
                  <div className="vendor-compare-meta">
                    <div className="vendor-compare-meta-item">
                      <span className="vendor-compare-meta-label">Price</span>
                      <span className="vendor-compare-meta-value">
                        {listing.price.toLocaleString()} {listing.currency}
                      </span>
                    </div>
                    <div className="vendor-compare-meta-item">
                      <span className="vendor-compare-meta-label">Rating</span>
                      <span className="vendor-compare-meta-value">
                        {listing.rating.toFixed(1)} / 5
                      </span>
                    </div>
                  </div>
                  <div className="vendor-compare-actions">
                    <Button variant="ghost" size="sm">
                      View profile
                    </Button>
                    <Button variant="ghost" size="sm">
                      Compare
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannerShortlistPage;
