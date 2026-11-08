import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Input, TextArea } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import './VendorPlannerDashboard.css';

export const ProfileEditor: React.FC = () => {
  const [form, setForm] = useState({
    companyName: 'Vasquez Events Studio',
    tagline: 'Elevated gatherings, thoughtfully designed.',
    description: 'Full-service event design and production studio.',
    serviceArea: 'San Francisco Bay Area, Monterey, Napa Valley',
    yearsOfExperience: 12,
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Profile editor</h1>
        <p>Manage your public profile information.</p>
      </div>

      <div className="profile-editor-grid">
        <Card>
          <h3 className="editor-section-title">Basic information</h3>
          <div className="editor-form">
            <Input
              label="Company name"
              value={form.companyName}
              onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
            />
            <Input
              label="Tagline"
              value={form.tagline}
              onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
              hint="A short tagline that appears on your profile"
            />
            <TextArea
              label="Description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={4}
            />
          </div>
          <div className="editor-form-actions">
            <Button variant="primary">Save changes</Button>
            <Button variant="ghost">Preview</Button>
          </div>
        </Card>

        <Card>
          <h3 className="editor-section-title">Location & experience</h3>
          <div className="editor-form">
            <Input
              label="Service areas"
              value={form.serviceArea}
              onChange={(e) => setForm((p) => ({ ...p, serviceArea: e.target.value }))}
              hint="Comma-separated list of cities or regions"
            />
            <Input
              label="Years of experience"
              type="number"
              value={String(form.yearsOfExperience)}
              onChange={(e) => setForm((p) => ({ ...p, yearsOfExperience: Number(e.target.value) }))}
            />
          </div>
        </Card>

        <Card className="editor-info-card">
          <h3 className="editor-section-title">Profile status</h3>
          <div className="editor-status-list">
            <div className="editor-status-item">
              <StatusBadge status="verified" />
              <span>Verified profile</span>
            </div>
            <div className="editor-status-item">
              <span>✦</span>
              <span>Public profile visible</span>
            </div>
            <div className="editor-status-item">
              <span>✦</span>
              <span>Marketplace listing active</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEditor;
