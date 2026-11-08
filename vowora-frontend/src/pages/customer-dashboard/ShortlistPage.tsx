import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './EventPages.css';

export const ShortlistPage: React.FC = () => {
  const shortlist = mockData.shortlists.getShortlist('sl-1');

  return (
    <div className="event-page">
      <div className="event-page-inner">
        <div className="event-page-header">
          <h1>Vendor shortlist</h1>
          <p>
            {shortlist
              ? `Compare ${shortlist.vendorCount} vendors for the ${
                  shortlist.eventName
                } event. Share your shortlist or finalize your selections.`
              : 'Create a shortlist to compare vendors side by side.'}
          </p>
        </div>

        {!shortlist ? (
          <Card>
            <EmptyState
              title="No shortlist yet"
              description="Create a shortlist for an event to start comparing vendors."
              action={
                <Link to="/dashboard/event-brief">
                  <Button variant="secondary">Create event first</Button>
                </Link>
              }
            />
          </Card>
        ) : (
          <div className="shortlist-header">
            <div className="shortlist-info">
              <span className="shortlist-event-name">{shortlist.eventName}</span>
              <StatusBadge status={shortlist.status} />
            </div>
            <div className="shortlist-actions">
              <Button variant="secondary">Share shortlist</Button>
              <Button variant="primary">Finalize</Button>
            </div>
          </div>
        )}

        <div className="vendor-compare-grid">
          {mockData.marketplace.getListings({ pageSize: 2 }).listings.map((listing) => {
            const vendor = mockData.users.getVendorProfile(listing.vendorId);
            return (
              <Card key={listing.id} className="vendor-compare-card">
                <div className="vendor-compare-header">
                  {vendor?.isVerified && <StatusBadge status="verified" size="sm" />}
                  <span className="vendor-compare-name">{vendor?.companyName || 'Vendor'}</span>
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
                  <div className="vendor-compare-meta-item">
                    <span className="vendor-compare-meta-label">Status</span>
                    <span className="vendor-compare-meta-value">
                      <StatusBadge status={listing.isAvailable ? 'available' : 'unavailable'} size="sm" />
                    </span>
                  </div>
                </div>

                <div className="vendor-compare-actions">
                  <Button variant="ghost" size="sm">
                    View profile
                  </Button>
                  <Button variant="secondary" size="sm" disabled>
                    Request quote
                  </Button>
                  <Button variant="ghost" size="sm" icon={<HeartIcon />}>
                    Save
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function HeartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default ShortlistPage;
