import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { DataTable } from '../../components/common/DataTable';
import { mockData } from '../../services/mockData';
import './Admin.css';

const plans = [
  {
    name: 'Silver',
    price: '$49',
    period: '/month',
    description: 'Essential plan for new vendors and planners getting started on Vowora.',
    features: [
      { label: 'Portfolio images', value: '10', included: true },
      { label: 'Packages', value: '10', included: true },
      { label: 'CRM access', value: 'Yes', included: true },
      { label: 'Team members', value: '5', included: true },
      { label: 'Custom branding', value: 'Basic', included: true },
      { label: 'n8n automation', value: 'Yes', included: true },
      { label: 'n8n templates', value: 'Silver', included: true },
      { label: 'Analytics', value: 'Basic', included: true },
      { label: 'Search visibility', value: 'Normal', included: true },
      { label: 'Priority support', value: 'Same', included: true },
    ],
  },
  {
    name: 'Gold',
    price: '$99',
    period: '/month',
    description: 'Growth plan for established businesses scaling their presence.',
    features: [
      { label: 'Portfolio images', value: '50', included: true },
      { label: 'Packages', value: '25', included: true },
      { label: 'CRM access', value: 'Yes', included: true },
      { label: 'Team members', value: '10', included: true },
      { label: 'Custom branding', value: 'Moderate', included: true },
      { label: 'n8n automation', value: 'Yes', included: true },
      { label: 'n8n templates', value: 'Gold', included: true },
      { label: 'Analytics', value: 'Advanced', included: true },
      { label: 'Search visibility', value: 'Improved', included: true },
      { label: 'Priority support', value: 'Same', included: true },
    ],
  },
  {
    name: 'Diamond',
    price: '$199',
    period: '/month',
    description: 'Premium plan for high-volume businesses with advanced needs.',
    features: [
      { label: 'Portfolio images', value: 'Unlimited', included: true },
      { label: 'Packages', value: 'Unlimited', included: true },
      { label: 'CRM access', value: 'Yes', included: true },
      { label: 'Team members', value: '15', included: true },
      { label: 'Custom branding', value: 'Advanced', included: true },
      { label: 'n8n automation', value: 'Yes', included: true },
      { label: 'n8n templates', value: 'Diamond', included: true },
      { label: 'Analytics', value: 'Full', included: true },
      { label: 'Search visibility', value: 'Priority', included: true },
      { label: 'Priority support', value: 'Same', included: true },
    ],
  },
];

export const AdminPlans: React.FC = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Subscription plans</h1>
        <p>Configure and manage subscription plans for vendors and planners.</p>
      </div>

      <div className="admin-plans-grid">
        {plans.map((plan) => (
          <Card key={plan.name} className="admin-plan-card">
            <div className="admin-plan-header">
              <div>
                <h3 className="admin-plan-name">{plan.name}</h3>
                <p className="admin-plan-price">
                  {plan.price}
                  <span className="admin-plan-period">{plan.period}</span>
                </p>
                <p className="admin-plan-description">{plan.description}</p>
              </div>
              <Button variant="secondary" size="sm">
                Configure
              </Button>
            </div>
            <div className="admin-plan-features">
              <table className="admin-plan-features-table">
                <tbody>
                  {plan.features.map((feature) => (
                    <tr key={feature.label}>
                      <td className="admin-plan-feature-label">{feature.label}</td>
                      <td className="admin-plan-feature-value">{feature.value}</td>
                      <td className="admin-plan-feature-included">
                        {feature.included && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>

      <Card className="admin-plan-config-card">
        <h3 className="admin-section-title">Plan configuration</h3>
        <p className="admin-section-description">
          Plan limits are stored in the database and will be connected to the FastAPI backend.
          Configuration options include pricing, limits, feature entitlements, and plan ordering.
        </p>
        <div className="admin-config-placeholder">
          <Button variant="ghost" size="sm">
            Configure from database
          </Button>
          <Button variant="ghost" size="sm">
            Configure from admin
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminPlans;
