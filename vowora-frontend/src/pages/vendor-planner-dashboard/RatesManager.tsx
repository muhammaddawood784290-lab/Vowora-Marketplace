import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { StatusBadge } from '../../components/common/StatusBadge';
import './VendorPlannerDashboard.css';

export const RatesManager: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Rates</h1>
        <p>Set your base rates, hourly rates, and pricing structure.</p>
      </div>

      <Card>
        <h3 className="editor-section-title">Rate configuration</h3>
        <p className="editor-section-description">
          Define your standard rates. These will be used as defaults when creating quotes.
        </p>
        <div className="rates-form">
          <div className="rates-form-row">
            <div className="rates-form-group">
              <label className="form-label">Hourly rate</label>
              <div className="rates-input-group">
                <input type="number" className="form-input" placeholder="0" />
                <select className="form-select rates-currency">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
            <div className="rates-form-group">
              <label className="form-label">Day rate</label>
              <div className="rates-input-group">
                <input type="number" className="form-input" placeholder="0" />
                <select className="form-select rates-currency">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>
          <div className="rates-form-row">
            <div className="rates-form-group">
              <label className="form-label">Minimum booking</label>
              <div className="rates-input-group">
                <input type="number" className="form-input" placeholder="0" />
                <span className="rates-unit">hours</span>
              </div>
            </div>
            <div className="rates-form-group">
              <label className="form-label">Travel fee</label>
              <div className="rates-input-group">
                <input type="number" className="form-input" placeholder="0" />
                <span className="rates-unit">per mile</span>
              </div>
            </div>
          </div>
          <div className="rates-form-actions">
            <Button variant="primary">Save rates</Button>
          </div>
        </div>
      </Card>

      <Card className="rates-info-card">
        <h3 className="editor-section-title">Pricing information</h3>
        <p className="rates-info-text">
          Rates are stored per service and can be overridden when creating quotes. All monetary
          values are stored in integer minor units with ISO currency codes. Final pricing is
          determined in coordination with customers and confirmed in quotes.
        </p>
      </Card>
    </div>
  );
};

export default RatesManager;
