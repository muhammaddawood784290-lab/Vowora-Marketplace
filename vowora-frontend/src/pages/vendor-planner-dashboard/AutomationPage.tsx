import React from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { mockData } from '../../services/mockData';
import './VendorPlannerDashboard.css';

export const AutomationPage: React.FC = () => {
  const templates = mockData.admin.getAuthnTemplates();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>n8n automation</h1>
        <p>Configure automated workflows for notifications, reminders, and CRM actions.</p>
      </div>

      <Card>
        <h3 className="editor-section-title">Ready-made templates</h3>
        <p className="editor-section-description">
          Use these n8n workflow templates to automate common tasks. All plans include automation
          access with plan-specific template libraries.
        </p>
        <div className="automation-templates">
          {templates.map((template, index) => (
            <div key={template} className={`automation-template stagger-item`} style={{ animationDelay: `${index * 50}ms` }}>
              <div className="automation-template-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <div className="automation-template-content">
                <span className="automation-template-name">{template}</span>
                <span className="automation-template-status">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Available
                </span>
              </div>
              <Button variant="ghost" size="sm">
                Use template
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="automation-info-card">
        <h3 className="editor-section-title">Automation note</h3>
        <p className="automation-info-text">
          n8n automation is available on all plans. Workflows are triggered by FastAPI events and
          executed through authenticated webhooks. Full n8n integration with workflow editor, trigger
          configuration, and execution logs will be available when the backend is connected.
        </p>
        <p className="automation-note">
          Note: Live workflow execution is not available in the frontend yet. Templates are shown as
          placeholders representing planned automation capabilities.
        </p>
      </Card>

      <Card>
        <h3 className="editor-section-title">Webhooks</h3>
        <p className="editor-section-description">
          Configure webhook endpoints for n8n to receive events from Vowora.
        </p>
        <div className="webhook-form">
          <div className="webhook-form-group">
            <label className="form-label">Webhook URL</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://your-n8n-instance.com/webhook/vowora"
              disabled
            />
          </div>
          <div className="webhook-form-group">
            <label className="form-label">Secret key</label>
            <input
              type="password"
              className="form-input"
              placeholder="******"
              disabled
            />
          </div>
          <p className="form-hint">
            Webhook configuration requires the backend to be connected.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AutomationPage;
