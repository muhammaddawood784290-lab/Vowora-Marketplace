import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { mockData } from '../../services/mockData';
import './EventPages.css';

export const PlannerSelection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');

  const planners = [
    mockData.users.getUserById('user-p1'),
    mockData.users.getUserById('user-p2'),
  ].filter(Boolean) as { id: string; firstName: string; lastName: string; role: string; avatar?: string }[];

  const plannerProfiles = planners.map((p) => {
    const profile = mockData.users.getPlannerProfile(p.id!);
    if (!profile) return null;
    return { user: p, profile };
  }).filter((p): p is NonNullable<typeof p> => p !== null);

  if (plannerProfiles.length === 0) {
    return (
      <div className="event-page">
        <div className="event-page-inner">
          <EmptyState
            title="No planners found"
            description="Try adjusting your filters or browse the marketplace for available planners."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="event-page">
      <div className="event-page-inner">
        <div className="event-page-header">
          <h1>Select a planner</h1>
          <p>
            Browse qualified planners and request one for your event. You can also assign a
            planner directly if you already have someone in mind.
          </p>
        </div>

        <div className="event-section">
          <div className="planner-filters">
            <div className="planner-filter-group">
              <label className="form-label">Filter by specialty</label>
              <select className="form-select" defaultValue="">
                <option value="">All specialties</option>
                <option value="weddings">Weddings</option>
                <option value="luxury">Luxury events</option>
                <option value="destination">Destination events</option>
                <option value="cultural">Cultural weddings</option>
              </select>
            </div>
            <div className="planner-filter-group">
              <label className="form-label">Sort by</label>
              <select className="form-select" defaultValue="rating">
                <option value="rating">Highest rated</option>
                <option value="experience">Years of experience</option>
                <option value="reviewCount">Most reviews</option>
              </select>
            </div>
          </div>
        </div>

        <div className="planner-grid">
          {plannerProfiles.map(({ user, profile }) => (
            <Card key={user.id} className="planner-card hover-lift">
              <div className="planner-card-header">
                {user.avatar ? (
                  <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="planner-avatar" />
                ) : (
                  <div className="planner-avatar-planner">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                )}
                <div className="planner-info">
                  <span className="planner-name">
                    {user.firstName} {user.lastName}
                  </span>
                  {profile.companyName && (
                    <span className="planner-company">{profile.companyName}</span>
                  )}
                  {profile.title && (
                    <span className="planner-title">{profile.title}</span>
                  )}
                </div>
                {profile.isVerified && (
                  <StatusBadge status="verified" size="sm" />
                )}
              </div>

              <p className="planner-description">{profile.description}</p>

              <div className="planner-specialties">
                {profile.specialties.map((s) => (
                  <span key={s} className="planner-specialty">
                    {s}
                  </span>
                ))}
              </div>

              <div className="planner-meta">
                <div className="planner-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>
                    {profile.rating.toFixed(1)} ({profile.reviewCount} reviews)
                  </span>
                </div>
                <div className="planner-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{profile.yearsOfExperience} years experience</span>
                </div>
                <div className="planner-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{profile.serviceArea.slice(0, 2).join(', ')}</span>
                </div>
              </div>

              <div className="planner-stats">
                <div className="planner-stat">
                  <span className="planner-stat-value">{profile.completedEventCount}</span>
                  <span className="planner-stat-label">Completed events</span>
                </div>
                <div className="planner-stat">
                  <span className="planner-stat-value">{profile.assignedEventCount}</span>
                  <span className="planner-stat-label">Active events</span>
                </div>
              </div>

              <div className="planner-card-actions">
                {eventId ? (
                  <Link to={`/dashboard/event/${eventId}`}>
                    <Button variant="primary" fullWidth>
                      Select this planner
                    </Button>
                  </Link>
                ) : (
                  <Button variant="primary" fullWidth disabled>
                    Select planner
                  </Button>
                )}
                <Link to={`/marketplace/planner/${user.id}`}>
                  <Button variant="ghost" fullWidth>
                    View full profile
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>


      </div>
    </div>
  );
};

export default PlannerSelection;
