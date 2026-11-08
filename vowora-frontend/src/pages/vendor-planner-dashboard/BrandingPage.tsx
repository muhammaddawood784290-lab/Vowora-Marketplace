import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockData } from '../../services/mockData';
import './VendorPlannerDashboard.css';

export const BrandingPage: React.FC = () => {
  const plan = mockData.users.getVendorProfile('user-v1')?.brandingTier || 'basic';

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Branding settings</h1>
        <p>Customize your public profile branding and appearance.</p>
      </div>

      <Card>
        <h3 className="editor-section-title">Current plan branding tier</h3>
        <div className="branding-tier-display">
          <span className="branding-tier-label">Custom branding</span>
          <StatusBadge status={plan} />
        </div>
        <p className="branding-description">
          Your {plan} branding tier includes:
        </p>
        <ul className="branding-features-list">
          {plan === 'basic' && (
            <>
              <li>Standard profile layout</li>
              <li>Basic color customization</li>
              <li>Public profile URL</li>
            </>
          )}
          {plan === 'moderate' && (
            <>
              <li>Custom profile layout</li>
              <li>Color and typography customization</li>
              <li>Logo upload</li>
              <li>Custom profile URL</li>
            </>
          )}
          {plan === 'advanced' && (
            <>
              <li>Full branding control</li>
              <li>Custom domains</li>
              <li>Advanced color and typography</li>
              <li>Logo and favicon upload</li>
              <li>Custom profile URL</li>
              <li>White-label options</li>
            </>
          )}
        </ul>
      </Card>

      <Card>
        <h3 className="editor-section-title">Profile branding</h3>
        <p className="editor-section-description">
          Customize how your profile appears to customers.
        </p>
        <div className="branding-form">
          <div className="branding-form-section">
            <label className="form-label">Logo</label>
            <div className="branding-upload">
              <div className="branding-upload-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Upload logo</span>
              </div>
              <Button variant="secondary" size="sm">
                Choose file
              </Button>
            </div>
            <p className="form-hint">Recommended: 400x400px, PNG or JPG</p>
          </div>
          <div className="branding-form-section">
            <label className="form-label">Brand color</label>
            <div className="branding-color-picker">
              <input type="color" value="#000000" className="branding-color-input" disabled />
              <span>Black (current)</span>
            </div>
            <p className="form-hint">
              Advanced color controls available on the {plan === 'advanced' ? 'Advanced' : plan === 'moderate' ? 'Moderate' : 'Basic'} plan.
            </p>
          </div>
        </div>
        <div className="branding-form-actions">
          <Button variant="primary">Save branding</Button>
        </div>
      </Card>

      <Card className="branding-info-card">
        <h3 className="editor-section-title">Plan upgrade</h3>
        <p className="branding-info-text">
          To unlock more branding options, upgrade your subscription plan from the{' '}
          <a href="/dashboard" className="branding-link">dashboard</a>.
        </p>
      </Card>
    </div>
  );
};

export default BrandingPage;
