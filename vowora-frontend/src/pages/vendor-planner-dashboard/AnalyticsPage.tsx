import React from 'react';
import { Card } from '../../components/common/Card';
import { mockData } from '../../services/mockData';
import { formatCurrency } from '../../utils/format';
import './VendorPlannerDashboard.css';

export const AnalyticsPage: React.FC = () => {
  const analytics = mockData.analytics.getSummary('user-v1', 'vendor');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Track your business performance and growth over time.</p>
      </div>

      <Card>
        <h3 className="analytics-title">Overview</h3>
        <p className="analytics-subtitle">
          Your performance at a glance.
        </p>
        <div className="analytics-grid">
          <div className="analytics-metric">
            <span className="analytics-metric-value">
              {formatCurrency(analytics.totalRevenue, analytics.currency)}
            </span>
            <span className="analytics-metric-label">Total revenue</span>
          </div>
          <div className="analytics-metric">
            <span className="analytics-metric-value">{analytics.conversionRate}%</span>
            <span className="analytics-metric-label">Conversion rate</span>
          </div>
          <div className="analytics-metric">
            <span className="analytics-metric-value">
              {analytics.averageRating.toFixed(1)}
            </span>
            <span className="analytics-metric-label">Average rating</span>
          </div>
          <div className="analytics-metric">
            <span className="analytics-metric-value">{analytics.reviewCount}</span>
            <span className="analytics-metric-label">Total reviews</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="analytics-title">Monthly revenue</h3>
        <p className="analytics-subtitle">
          Revenue trend over the past 6 months.
        </p>
        <div className="analytics-chart">
          <div className="analytics-chart-bars">
            {analytics.monthlyTrend.map((item, index) => (
              <div key={item.month} className="analytics-bar-group">
                <div
                  className="analytics-bar"
                  style={{
                    height: `${(item.value / 30000) * 100}%`,
                    animationDelay: `${index * 80}ms`,
                  }}
                />
                <span className="analytics-bar-label">{item.month}</span>
                <span className="analytics-bar-value">
                  {formatCurrency(item.value, analytics.currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="analytics-info-card">
        <h3 className="analytics-section-title">Analytics note</h3>
        <p className="analytics-info-text">
          Analytics are informational and will be fully powered by the FastAPI backend with
          PostgreSQL aggregate queries. Real-time analytics, export options, and custom date ranges
          will be added when the backend is connected.
        </p>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
